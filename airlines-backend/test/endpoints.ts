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

export const usersRoutes = {
  getAll: '/user',
  create: '/user',
  getById: (id: string) => `/user/${id}`,
  delete: (id: string) => `/user/${id}`,
};

export const authRoutes = {
  signUp: '/auth/signUp',
  signIn: '/auth/signIn',
  refresh: '/auth/refresh',
};

export const bookingRoutes = {
  get: '/booking',
  create: '/booking',
};
