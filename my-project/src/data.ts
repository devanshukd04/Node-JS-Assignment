export type UserData = {
  firstname: string
  email: string
  password:string
}

export type Form1Data={
  username:string
  email:string
  number:number
  addressLine1:string,
  addressLine2:string,
  city:string,
  state:string
  pincode:number,
  country:string,
}

export const Form1Fields = [
  { label: 'Name', name: 'name', type: 'text', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Mobile Number', name: 'number', type: 'number', required: true },
  { label: 'Address Line1', name: 'addressLine1', type: 'text', required: true },
  { label: 'Address Line2', name: 'addressLine2', type: 'text', required: true },
  { label: 'City', name: 'city', type: 'text', required: true },
  { label: 'State', name: 'state', type: 'text', required: true },
  { label: 'Pincode', name: 'pincode', type: 'number', required: true },
  { label: 'Country', name: 'country', type: 'text', required: true }
];

