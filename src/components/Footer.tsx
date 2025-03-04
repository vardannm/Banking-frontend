const Footer = () => {
  const currentYear = new Date().getFullYear();
    return (
      <footer className="bg-blue-600 p-4 text-white mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy;{currentYear} Banking App. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;