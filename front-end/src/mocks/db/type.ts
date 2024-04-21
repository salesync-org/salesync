const types = [
  {
    "id": "11111111-1111-1111-1111-111111111111",
    "name": "Lead",
    "template": {
      "id": "9df64710-3778-4fbd-8644-eedc895eb181",
      "name": "StageObject"
    }
  },
  {
    "id": "22222222-2222-2222-2222-222222222222",
    "name": "Contact",
    "template": null
  },
  {
    "id": "33333333-3333-3333-3333-333333333333",
    "name": "Opportunity",
    "template": {
      "id": "9df64710-3778-4fbd-8644-eedc895eb181",
      "name": "StageObject"
    }
  },
  {
    "id": "44444444-4444-4444-4444-444444444444",
    "name": "Account",
    "template": {
      "id": "4540f51c-0599-4187-90b2-6bf88d2b0cd5",
      "name": "Group"
    }
  },
  {
    "id": "5fc816d6-053f-43a1-97b3-ba7b3e21ff6f",
    "name": "Task",
    "template": {
      "id": "406b1b14-b88b-46b7-89dc-3cbe12a8feea",
      "name": "Activity"
    }
  },
  {
    "id": "0b1fd7d5-0692-4b3f-b04f-129a4ece6b3f",
    "name": "Event",
    "template": {
      "id": "406b1b14-b88b-46b7-89dc-3cbe12a8feea",
      "name": "Activity"
    }
  },
  {
    "id": "a1f23d87-0ba0-480f-876b-510833238ed9",
    "name": "Deal",
    "template": {
      "id": "406b1b14-b88b-46b7-89dc-3cbe12a8feea",
      "name": "Activity"
    }
  },
  {
    "id": "15621282-0b97-4025-b312-bc34024817e6",
    "name": "Campaign",
    "template": {
      "id": "ed0499da-6995-4f0a-b140-02a5cc36f3d6",
      "name": "Object"
    }
  },
  {
    "id": "59351720-3769-4445-bc5f-1f20fc3443bc",
    "name": "Invoice",
    "template": {
      "id": "ed0499da-6995-4f0a-b140-02a5cc36f3d6",
      "name": "Object"
    }
  },
  {
    "id": "c7d6d28f-38f6-4fe1-ace0-bbe37faef1d8",
    "name": "Quote",
    "template": {
      "id": "ed0499da-6995-4f0a-b140-02a5cc36f3d6",
      "name": "Object"
    }
  },
  {
    "id": "629d3f8e-c957-4444-8174-97066ecbc77a",
    "name": "Product",
    "template": {
      "id": "ed0499da-6995-4f0a-b140-02a5cc36f3d6",
      "name": "Object"
    }
  },
  {
    "id": "c104700e-6573-4615-8a45-990061363cd2",
    "name": "Case",
    "template": {
      "id": "ed0499da-6995-4f0a-b140-02a5cc36f3d6",
      "name": "Object"
    }
  },
  {
    "id": "55e7f3aa-963b-47e6-918d-c47eb7f75467",
    "name": "Contract",
    "template": {
      "id": "ed0499da-6995-4f0a-b140-02a5cc36f3d6",
      "name": "Object"
    }
  }
]

const type = {
  "id": "11111111-1111-1111-1111-111111111111",
  "name": "Lead",
  "template": 'StageObject',
  "properties": [
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "name": "Name",
      "label": "Lead Name",
      "sequence": 1,
      "property": {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Text",
        "propertyFields": [
          {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        ]
      },
      "default_value": "No Name",
      "fields": [
        {
          "id": "76a153fa-38a5-468e-8626-b45c934749e9",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "120c0a13-46fd-4d7d-a4c0-6275e27a79c7",
          "item_value": "255",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "c4ff9d24-bf88-4182-848d-3ee218cd7039",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        }
      ]
    },
    {
      "id": "22222222-2222-2222-2222-222222222222",
      "name": "Title",
      "label": "Title",
      "sequence": 2,
      "property": {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Text",
        "propertyFields": [
          {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        ]
      },
      "default_value": "No Title",
      "fields": [
        {
          "id": "b50bad7d-d73d-4af7-9fea-b0a2e2ede196",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "f568adcf-ba64-4327-b5dc-a07abe678413",
          "item_value": "255",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "785e8749-7b43-4038-8ef1-b908d21db256",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        }
      ]
    },
    {
      "id": "33333333-3333-3333-3333-333333333333",
      "name": "Company",
      "label": "Company",
      "sequence": 3,
      "property": {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Text",
        "propertyFields": [
          {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        ]
      },
      "default_value": "No Company",
      "fields": [
        {
          "id": "4209ac99-b4fc-465e-9a7e-f0820d7c9bd8",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "203ee102-ccdb-4cfa-af2d-9e74da6fe46d",
          "item_value": "255",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "53e94b59-da8e-426f-8c90-488501f9519e",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        }
      ]
    },
    {
      "id": "44444444-4444-4444-4444-444444444444",
      "name": "Phone",
      "label": "Phone",
      "sequence": 4,
      "property": {
        "id": "44444444-4444-4444-4444-444444444444",
        "name": "Phone",
        "propertyFields": [
          {
            "id": "77777777-7777-7777-7777-777777777772",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        ]
      },
      "default_value": "No Phone",
      "fields": [
        {
          "id": "daa20b87-26ae-4856-b0d7-8dd969008426",
          "item_value": "false",
          "property_field": {
            "id": "77777777-7777-7777-7777-777777777772",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        }
      ]
    },
    {
      "id": "63f0a11f-991c-44c7-802c-0d5ba8b047e8",
      "name": "RetireAge",
      "label": "Retire Age",
      "sequence": 1,
      "property": {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Text",
        "propertyFields": [
          {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        ]
      },
      "default_value": "",
      "fields": [
        {
          "id": "86d1eb37-4773-4ed9-a7d1-c148441f76dc",
          "item_value": "true",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "20656b1d-9f8f-4d6f-bf77-c4f1fa3cebf2",
          "item_value": "255",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "b6ca17d3-210d-4695-bcbd-d481cc7b3a89",
          "item_value": "true",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        }
      ]
    }
  ]
}
const type1 = {
  "id": "22222222-2222-2222-2222-222222222222",
  "name": "Contact",
  "template": 'Object',
  "properties": [
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "name": "Name",
      "label": "Lead Name",
      "sequence": 1,
      "property": {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Text",
        "propertyFields": [
          {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        ]
      },
      "default_value": "No Name",
      "fields": [
        {
          "id": "76a153fa-38a5-468e-8626-b45c934749e9",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "120c0a13-46fd-4d7d-a4c0-6275e27a79c7",
          "item_value": "255",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "c4ff9d24-bf88-4182-848d-3ee218cd7039",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        }
      ]
    },
    {
      "id": "22222222-2222-2222-2222-222222222222",
      "name": "Title",
      "label": "Title",
      "sequence": 2,
      "property": {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Text",
        "propertyFields": [
          {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        ]
      },
      "default_value": "No Title",
      "fields": [
        {
          "id": "b50bad7d-d73d-4af7-9fea-b0a2e2ede196",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "f568adcf-ba64-4327-b5dc-a07abe678413",
          "item_value": "255",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "785e8749-7b43-4038-8ef1-b908d21db256",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        }
      ]
    },
    {
      "id": "33333333-3333-3333-3333-333333333333",
      "name": "Company",
      "label": "Company",
      "sequence": 3,
      "property": {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Text",
        "propertyFields": [
          {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        ]
      },
      "default_value": "No Company",
      "fields": [
        {
          "id": "4209ac99-b4fc-465e-9a7e-f0820d7c9bd8",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "203ee102-ccdb-4cfa-af2d-9e74da6fe46d",
          "item_value": "255",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "53e94b59-da8e-426f-8c90-488501f9519e",
          "item_value": "false",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        }
      ]
    },
    {
      "id": "44444444-4444-4444-4444-444444444444",
      "name": "Phone",
      "label": "Phone",
      "sequence": 4,
      "property": {
        "id": "44444444-4444-4444-4444-444444444444",
        "name": "Phone",
        "propertyFields": [
          {
            "id": "77777777-7777-7777-7777-777777777772",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        ]
      },
      "default_value": "No Phone",
      "fields": [
        {
          "id": "daa20b87-26ae-4856-b0d7-8dd969008426",
          "item_value": "false",
          "property_field": {
            "id": "77777777-7777-7777-7777-777777777772",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        }
      ]
    },
    {
      "id": "63f0a11f-991c-44c7-802c-0d5ba8b047e8",
      "name": "RetireAge",
      "label": "Retire Age",
      "sequence": 1,
      "property": {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Text",
        "propertyFields": [
          {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          },
          {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        ]
      },
      "default_value": "",
      "fields": [
        {
          "id": "86d1eb37-4773-4ed9-a7d1-c148441f76dc",
          "item_value": "true",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111112",
            "label": "Required",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": false,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "20656b1d-9f8f-4d6f-bf77-c4f1fa3cebf2",
          "item_value": "255",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111113",
            "label": "Length",
            "item_value": null,
            "is_required": true,
            "default_value": "255",
            "is_key": true,
            "field": {
              "id": "33333333-3333-3333-3333-333333333333",
              "input_type": "NumberText",
              "is_multiple_value": false
            }
          }
        },
        {
          "id": "b6ca17d3-210d-4695-bcbd-d481cc7b3a89",
          "item_value": "true",
          "property_field": {
            "id": "11111111-1111-1111-1111-111111111114",
            "label": "Unique",
            "item_value": null,
            "is_required": true,
            "default_value": "false",
            "is_key": true,
            "field": {
              "id": "22222222-2222-2222-2222-222222222222",
              "input_type": "Checkbox",
              "is_multiple_value": false
            }
          }
        }
      ]
    }
  ]
}

export { types, type, type1 };
