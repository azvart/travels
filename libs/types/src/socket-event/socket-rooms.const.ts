export const SOCKET_ROOMS: {
  forUser: (payload: { userId: string }) => string;
} = {
  forUser: ({ userId }: { userId: string }) => `travel-socket:user:${userId}`,
};
