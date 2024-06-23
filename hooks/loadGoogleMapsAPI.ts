function loadGoogleMapsAPI(callback: () => void) {
    if ((window as any).google && (window as any).google.maps) {
      callback();
    } else {
      const apiKey = "AIzaSyA_4ZnnpViUCht6wNxvOPnmCbvp-O_rOiM"
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = callback;
  
      document.head.appendChild(script);
    }
  }
  
  export default loadGoogleMapsAPI;
  