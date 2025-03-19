# Main Features

## Mobile Ready

Our starter kit is designed with mobile-first principles, ensuring that your application looks and performs seamless experience whether users are on a smartphone, tablet, or desktop.

Key features include:

- **Responsive Layouts**: Automatically adjust to different screen sizes and orientations.
- **Cross-Platform Compatibility**: Consistent look and feel across various devices and operating systems.
- **Mobile-Specific Enhancements**: Features like mobile navigation menus, swipe gestures, and more.

## SEO Friendly

Our starter kit is built with the latest technologies including React 19 allowing you to create SEO-friendly web applications that rank higher in search engine results.

```jsx
const HomePage = ({ currentOffer }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    id: window?.location?.href,
    sku: '11112222',
	name: "Samsung Galaxy Z Flip6 5G",
	color: "Silver",
	brand: {
		"@type": "Brand",
		"name": "Samsung"
	},
  };

  return (
    <>
      <title>My Override Title</title>
      <meta name="description" content="My cool APP built with Harmony" />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      {/* Page content */}
    </>
  );
};

export default HomePage;

```
