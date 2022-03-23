import {
	INodeProperties,
} from 'n8n-workflow';
import {messageFields} from "../Slack/MessageDescription";

export const occupancyOperations: INodeProperties[] = [
	{
		displayName: 'Occupancy Controller',
		name: 'occupancyController',
		type: 'options',
		required: true,
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
				description: 'Retrieve available/occupied spots for each area. Erased areas are excluded..',
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
			},
			{
				name: 'Tendency Occupation',
				value: 'tendencyOccupation',
				description: 'Retrieve average occupation of given date and average occupation of registers gathered during last month.',
			},
		],
		default: '',
		description: 'Occupancy controller.',
	},
	{
		displayName: 'Day Of Week Finish',
		name: 'dayOfWeekFinish',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				operation: [
					'occupancyByHour',
				],
				resource: [
					'occupancy',
				],
				// operation: [
				// 	'occupancyByHour',
				// ],
			},
		},
		description: 'Finish day of week - Sunday=1, Saturday=7.',
	},
	{
		displayName: 'Day Of Week Start',
		name: 'dayOfWeekStart',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				operation: [
					'occupancyByHour',
				],
				resource: [
					'occupancy',
				],// operation: [
				// 	'occupancyByHour',
				// ],
			},
		},
		description: `Start day of week - Sunday=1, Saturday=7.`,
	},
	{
		displayName: 'Finish Date',
		name: 'finishDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				operation: [
					'occupancyByHour',
				],
				resource: [
					'occupancy',
				],
				// operation: [
				// 	'occupancyByHour',
				// ],
			},
		},
		description: `Finish date. Format dd-MM-yyyy`,
	},
	{
		displayName: 'Day Of Week Start',
		name: 'dayOfWeekStart',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				operation: [
					'occupancyByHour',
				],
				resource: [
					'occupancy',
				],
				// operation: [
				// 	'occupancyByHour',
				// ],
			},
		},
		description: `Start date. Format dd-MM-yyyy.`,
	},
];

// export const occupancyFields: INodeProperties[] = [];
