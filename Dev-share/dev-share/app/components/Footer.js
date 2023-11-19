
const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <>
      <footer className="bg-gray-200 text-center py-4 fixed bottom-0 w-full">
        <p>&copy; {currentYear} Developed by Istiak Rahman</p>
      </footer>
    </>
    );
    
  };
  
  
  export default Footer;