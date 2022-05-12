import {IExecuteFunctions} from 'n8n-core';

import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	IDataObject,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	occupancyFields,
	occupancyOperations,
} from './OccupancyDescription';

import {
	quercusApiRequest,

} from './GenericFunctions';

function dateAsYYYYMMDDHHNNSS(date: Date): string {
	return leftPad(date.getDate(), 2)
		+ '-' + leftPad(date.getMonth() + 1, 2)
		+ '-' + date.getFullYear()
		+ '-' + leftPad(date.getHours(), 2)
		+ ':' + leftPad(date.getMinutes(), 2);
}

function leftPad(val: number, resultLength = 2, leftpadChar = '0'): string {
	return (String(leftpadChar).repeat(resultLength)
		+ String(val)).slice(String(val).length);
}


export class Quercus implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Quercus',
		name: 'quercus',
		// icon: 'file:slack.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Quercus API',
		defaults: {
			name: 'E',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'quercusApi',
				required: true,
				displayOptions: {
					show: {
						authentication: [
							'accessToken',
						],
					},
				},
				testedBy: 'testQuercusTokenAuth',
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Access Token',
						value: 'accessToken',
					},
				],
				default: 'accessToken',
				description: 'The resource to operate on.',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Occupancy',
						value: 'occupancy',
					},

				],
				default: 'occupancy',
				description: 'The resource to operate on.',
			},

			...occupancyOperations,
			...occupancyFields,

		],
	};

	methods = {
		credentialTest: {
			async testQuercusTokenAuth(this: ICredentialTestFunctions, credential: ICredentialsDecrypted): Promise<INodeCredentialTestResult> {
				const options = {
					method: 'POST',
					// headers: {
					// 	'Content-Type': 'application/json; charset=utf-8',
					// },
					body: {
						'username': credential.data!.user,
						'password': credential.data!.password,
					},
					uri: 'http://168.119.241.220:8090/api/login',
					json: true,
				};

				try {
					const response = await this.helpers.request(options);
					if (response['token'] == null) {
						return {
							status: 'Error',
							message: `${response.error}`,
						};
					}
				} catch (err) {
					return {
						status: 'Error',
						message: `${err.message}`,
					};
				}

				return {
					status: 'OK',
					message: 'Connection successful!',
				};
			},
		},
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = items.length as unknown as number;
		let qs: IDataObject;
		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < length; i++) {
			try {
				responseData = {error: 'Resource ' + resource + ' / operation ' + operation + ' not found!'};
				qs = {};
				if (resource === 'occupancy') {
					if (operation === 'occupancyByArea') {
						responseData = await quercusApiRequest.call(this, 'GET', '/occupancy/byArea', {}, {});
					}
					if (operation === 'occupancyByHour') {
						const dayOfWeekFinish = this.getNodeParameter('dayOfWeekFinish', i) as number;
						const dayOfWeekStart = this.getNodeParameter('dayOfWeekStart', i) as number;
						const finishDate = this.getNodeParameter('finishDate', i) as string;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const formatFinishDate = new Date(finishDate).toLocaleDateString('en-GB', {
							day: 'numeric',
							month: 'numeric',
							year: 'numeric',
						}).split('/').join('-');
						const formatStartDate = new Date(startDate).toLocaleDateString('en-GB', {
							day: 'numeric',
							month: 'numeric',
							year: 'numeric',
						}).split('/').join('-');
						responseData = await quercusApiRequest.call(this, 'GET', '/occupancy/byHour', {}, {
							'startDate': formatStartDate,
							'finishDate': formatFinishDate,
							'dayOfWeekStart': dayOfWeekStart,
							'dayOfWeekFinish': dayOfWeekFinish,
						});
					}
					if (operation === 'parkingCurrentStatus') {
						responseData = await quercusApiRequest.call(this, 'GET', '/occupancy/parkingStatus', {}, {});
					}
					if (operation === 'tendencyOccupation') {

						const interval = this.getNodeParameter('interval', i) as number;
						const finishDate = this.getNodeParameter('date', i) as string;
						const formatFinishDate = dateAsYYYYMMDDHHNNSS(new Date(finishDate));
						responseData = await quercusApiRequest.call(this, 'GET', '/occupancy/tendency', {}, {
							'date': formatFinishDate,
							'interval': interval,
						});

					}
				}
				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({error: error.message});
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}

}
