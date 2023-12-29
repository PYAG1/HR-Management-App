function formatDate(isoDateString:string) {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    //@ts-ignore
    return date.toLocaleDateString(undefined, options);
  }
  export default formatDate