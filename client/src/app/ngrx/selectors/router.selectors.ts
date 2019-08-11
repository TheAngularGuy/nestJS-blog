import { RouterStateUrl } from '../serializers/custom-oute-serializer';

export const routerStateSelector = (state: any) =>
  ((state.router ? state.router.state : null) as RouterStateUrl) || {
    url: undefined,
    params: undefined,
    queryParams: undefined
  };
