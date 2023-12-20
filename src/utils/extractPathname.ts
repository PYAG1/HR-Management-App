 const extractPageTitle = (pathname:any) => {
    // Remove trailing slash and split the path by '/'
    const pathSegments = pathname.replace(/\/$/, '').split('/');
  
    // Get the last segment and capitalize it
    const pageTitle = pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() +
      pathSegments[pathSegments.length - 1].slice(1);
  
    return pageTitle;
  };
  export default extractPageTitle;