import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';


export class QuercusApi implements ICredentialType {
	name = 'quercusApi';
	displayName = 'Quercus API';
	documentationUrl = 'quercus';
	properties: INodeProperties[] = [
		{
			displayName: 'User',
			name: 'user',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: true,
			},
		},
	];
}
