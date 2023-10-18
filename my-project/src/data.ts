export type UserData = {
  firstname: string
  email: string
  password:string
}

export type Form1Data={
  username:string
  email:string
  number:string
  addressLine1:string,
  addressLine2:string,
  city:string,
  state:string
  pincode:string,
  country:string,
}

export const Form1Fields = [
  { label: 'Name', name: 'username', type: 'text', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Mobile Number', name: 'number', type: 'number', required: true },
  { label: 'Address Line1', name: 'addressLine1', type: 'text', required: true },
  { label: 'Address Line2', name: 'addressLine2', type: 'text', required: true },
  { label: 'City', name: 'city', type: 'text', required: true },
  { label: 'State', name: 'state', type: 'text', required: true },
  { label: 'Pincode', name: 'pincode', type: 'number', required: true },
  { label: 'Country', name: 'country', type: 'text', required: true }
];


export const Form3Options=[
  {label:'AI-ML Developer', id:1},
  {label:'Full Stack Developer', id:2},
]
