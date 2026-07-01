function Footer() {
  return (
    <footer className="border-t bg-white py-6">
      <div className="mx-auto max-w-7xl text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SaleKart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;