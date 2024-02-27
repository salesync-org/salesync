export const testData = [
  {
    id: generateUUID(),
    link_type: 'One To Many',
    to_type: 'Contact',
    label_name: 'Members'
  },
  {
    id: generateUUID(),
    link_type: 'One To Many',
    to_type: 'Lead',
    label_name: 'Leads'
  },
  {
    id: generateUUID(),
    link_type: 'Many To One',
    to_type: 'Account',
    label_name: 'Parent Account'
  },
  {
    id: generateUUID(),
    link_type: 'Many To Many',
    to_type: 'Task',
    label_name: 'Tasks'
  },
  {
    id: generateUUID(),
    link_type: 'One To Many',
    to_type: 'Opportunity',
    label_name: 'Opportunities'
  }
];

//Type data

export const typeData = [
  {
    id: generateUUID(),
    name: 'Account',
    description: 'This is an example type.',
    fields: [],
    links: []
  },
  {
    id: generateUUID(),
    name: 'Contact',
    description: 'This is an example type.',
    fields: [],
    links: []
  },
  {
    id: generateUUID(),
    name: 'Lead',
    description: 'This is an example type.',
    fields: [],
    links: []
  },
  {
    id: generateUUID(),
    name: 'Opportunity',
    description: 'This is an example type.',
    fields: [],
    links: []
  },
  {
    id: generateUUID(),
    name: 'Task',
    description: 'This is an example type.',
    fields: [],
    links: []
  }
];

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export default generateUUID;
