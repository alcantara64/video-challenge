const { routers } = require('../../components/Router/router.config');

const APPNAME = process.env.REACT_APP_NAME || '';

export const getRoute = (path: any) => {
  return routers.filter((route: any) => route.path === path)[0];
};

export const getPageTitle = (pathname: any) => {
  const route = routers.filter((route: any) => route.path === pathname);

  if (!route || route.length === 0) {
    return APPNAME;
  }

  return route[0].title + ' | ' + APPNAME;
};

export const getPageName = (pathname: any) => {
  const route = routers.filter((route: any) => route.path === pathname);

  if (!route || route.length === 0) {
    return APPNAME;
  }

  return route[0].name;
};
