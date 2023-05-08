export const userMixin = {
  data() {
    return {
      // User ID - GET ID of global variables by Login User
      userCurrent: {
        id: 'ckcgmp1aw003z0767zunqhh0u',
        name: 'Eduardo Pech',
      },
      enterprise: {
        id: 'ckcayuak800230729j5vdvas9',
      },
      userEnterprise: {
        id: 'ckcgmp1at003y0767agb1qlq4',
      },
      userLogin: {
        id: 'cke4mg6tu00fz0712fd9k2o7c',
        email: 'jro.n9020@gmail.com',
        name: 'Juan',
        lastName: 'Pérez',
        isActive: true,
        config: null,
        usersEnterprises: [
          {
            id: 'cke4mg6tr00fy0712k4sp947v',
            enterprise: {
              id: 'cke4mcd2b00ch0712isrnjepp',
              name: 'Empresa 3',
              paymentDueDate: '21/08/2020',
              permissions: [
                {
                  id: 'cke4mcead00e80712sphiiu6b',
                  name: 'Tratos',
                  enterprise: {
                    id: 'cke4mcd2b00ch0712isrnjepp',
                  },
                  typePermission: 'ROLE',
                  methods: [
                    {
                      label: 'Crear tratos',
                      method: 'READ',
                      isEnabled: false,
                    },
                    {
                      label: 'Listar los tratos',
                      method: 'READ',
                      isEnabled: false,
                    },
                    {
                      label: 'Actualizar tratos',
                      method: 'UPDATE',
                      isEnabled: false,
                    },
                    {
                      label: 'Eliminar tratos',
                      method: 'DELETE',
                      isEnabled: false,
                    },
                  ],
                  roles: [
                    {
                      id: 'cke4mce9j00e60712ue6xfzyb',
                      name: 'MANAGER',
                    },
                  ],
                },
                {
                  id: 'cke4mcebd00eb07120dy8nhow',
                  name: 'Usuarios',
                  enterprise: {
                    id: 'cke4mcd2b00ch0712isrnjepp',
                  },
                  typePermission: 'ROLE',
                  methods: [
                    {
                      label: 'Crear usuarios',
                      method: 'READ',
                      isEnabled: false,
                    },
                    {
                      label: 'Listar los usuarios',
                      method: 'READ',
                      isEnabled: false,
                    },
                    {
                      label: 'Actualizar usuarios',
                      method: 'UPDATE',
                      isEnabled: false,
                    },
                    {
                      label: 'Eliminar usuarios',
                      method: 'DELETE',
                      isEnabled: false,
                    },
                  ],
                  roles: [
                    {
                      id: 'cke4mce9j00e60712ue6xfzyb',
                      name: 'MANAGER',
                    },
                  ],
                },
              ],
            },
            suscription: {
              id: 'cke4mg6tx00g007124iqph0id',
              period: 'MONTHLY',
              price: 60000.5,
              dateStart: '21/08/2020',
              dateEnd: '27/09/2020',
              subsId: 'sub_I4SSlR2J4EtXOG',
              modulesExtra: [],
              createdAt: '21/08/2020 02:23',
            },
            plan: {
              id: 'ckcau0up500go07898y7946kd',
              name: 'Plan 1',
              modulesGroup: [
                {
                  id: 'ckcau0uqb00gp0789ccnm9srm',
                  name: 'Grupo 1',
                },
                {
                  id: 'ckcau0usr00gs0789m0e3rbji',
                  name: 'Grupo 2',
                },
              ],
              modulesExtra: [],
            },
            isActive: 'ACTIVE',
          },
        ],
      },
    };
  },
};
