import {
	INodeProperties,
} from 'n8n-workflow';

export const occupancyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'occupancy',
				],
			},
		},
		options: [
			{
				name: 'Occupancy By Area',
				value: 'occupancyByArea',
				description: 'Retrieve available/occupied spots for each area. Erased areas are excluded.',
			},
			{
				name: 'Occupancy By Hour',
				value: 'occupancyByHour',
				description: 'Retrieve occupation statistics per each hour of the day. Data can be filtered by date range and days of the week. Maximum date range is 60 days.',
			},
			{
				name: 'Parking Current Status',
				value: 'parkingCurrentStatus',
				description: 'Retrieve current status of the parking: Open areas, occupied spots, total capacity and previous occupied register.',
			}, {
				name: 'Tendency Occupation',
				value: 'tendencyOccupation',
				description: 'Retrieve average occupation of given date and average occupation of registers gathered during last month',
			},

		],
		default: 'occupancyByArea',
		description: 'The operation to perform.',
	},
];

export const occupancyFields: INodeProperties[] = [

	/* -------------------------------------------------------------------------- */
	/*                                channel:occupancyByArea                     */
	/* -------------------------------------------------------------------------- */

	{
		displayName: 'Day Of Week Finish',
		name: 'dayOfWeekFinish',
		type: 'number',
		default: null,
		placeholder: 'Day Of Week Finish',
		displayOptions: {
			show: {
				operation: [
					'occupancyByHour',
				],
				resource: [
					'occupancy',
				],
			},
		},
		required: false,
		description: 'Finish day of week - Sunday=1, Saturday=7',
	},

	{
		displayName: 'Day Of Week Start',
		name: 'dayOfWeekStart',
		type: 'number',
		default: null,
		placeholder: 'Day Of Week Start',
		displayOptions: {
			show: {
				operation: [
					'occupancyByHour',
				],
				resource: [
					'occupancy',
				],
			},
		},
		required: false,
		description: 'Start day of week - Sunday=1, Saturday=7',
	},
	{
		displayName: 'Finish Date',
		name: 'finishDate',
		required: true,
		type: 'dateTime',
		displayOptions: {
			show: {
				operation: [
					'occupancyByHour',
				],
				resource: [
					'occupancy',
				],
			},
		},
		default: null,
		description: 'Finish date. Format dd-MM-yyyy',
	},

	{
		displayName: 'Start Date',
		name: 'startDate',
		required: true,
		type: 'dateTime',
		displayOptions: {
			show: {
				operation: [
					'occupancyByHour',
				],
				resource: [
					'occupancy',
				],
			},
		},
		default: null,
		description: 'Start date. Format dd-MM-yyyy',
	},
	{
		displayName: 'Date',
		name: 'date',
		required: true,
		type: 'dateTime',
		displayOptions: {
			show: {
				operation: [
					'tendencyOccupation',
				],
				resource: [
					'occupancy',
				],
			},
		},
		default: null,
		description: 'Current date time',
	},
	{
		displayName: 'Interval',
		name: 'interval',
		required: true,
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					'tendencyOccupation',
				],
				resource: [
					'occupancy',
				],
			},
		},
		default: '',
		description: 'Interval of hour to retrieve (Between 1 and 12)',
	},
];
