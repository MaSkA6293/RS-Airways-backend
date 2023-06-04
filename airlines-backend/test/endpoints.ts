export const airportsRoutes = {
  getAll: '/airport',
  create: '/airport',
  getById: (id: string) => `/airport/${id}`,
  delete: (id: string) => `/airport/${id}`,
};

export const flightsRoutes = {
  getAll: '/flight',
  create: '/flight/create',
  getById: (id: string) => `/flight/${id}`,
  delete: (id: string) => `/flight/${id}`,
};
