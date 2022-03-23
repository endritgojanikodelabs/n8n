import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';


import {occupancyOperations} from "./OccupancyDescription";

export class Quercus implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Quercus',
		name: 'Quercus',
		icon: 'file:quercus.png',
		group: ['transform'],
		version: 1,
		description: 'Consume Quercus API',
		defaults: {
			name: 'Quercus',
			color: '#1A82e2',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				// required: true,
				options: [
					{
						name: 'Access Events',
						value: 'accessEvents',
					},
					{
						name: 'Access Gates',
						value: 'accessGates',
					},
					{
						name: 'Access Lanes',
						value: 'accessLanes',
					},
					{
						name: 'Access Stays',
						value: 'accessStays',
					},
					{
						name: 'Aisles',
						value: 'aisles',
					},
					{
						name: 'Areas',
						value: 'areas',
					},
					{
						name: 'Blacklist Items',
						value: 'blacklistItems',
					},
					{
						name: 'CCTV Cameras',
						value: 'cctvCameras',
					},
					{
						name: 'Car Finder',
						value: 'carFinder',
					},
					{
						name: 'Occupancy',
						value: 'occupancy',
					},


				],
				default: 'occupancy',
				description: 'The resource to operate on.',
			},

			...occupancyOperations,
			// ...occupancyFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: IDataObject[] = [];


		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('occupancyOperations', 0) as string;
		// const occupancy = this.getNodeParameter('occupancyFields', 0) as string;

		if (resource === 'accessEvents') {
		}
		if (resource === 'accessGates') {
		}
		if (resource === 'accessLanes') {
		}
		if (resource === 'aisles') {
		}
		if (resource === 'areas') {
		}
		if (resource === 'blacklistItems') {
		}
		if (resource === 'cctvCameras') {
		}
		if (resource === 'carFinder') {
		}
		if (resource === 'occupancy') {
			if (operation == 'occupancyByArea') {
			}
			if (operation == 'occupancyByHour') {
			}
			if (operation == 'parkingCurrentStatus') {
			}
			if (operation == 'tendencyOccupation') {
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
