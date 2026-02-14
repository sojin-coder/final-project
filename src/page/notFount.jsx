import React from 'react'

const Data = [
    {
        id: 1,
        name: "Not Found",
        image: "", // Consider adding a default image URL here
        description: "The page you're looking for doesn't exist.",
    }
];

const notFound = () => {
  const notFoundData = Data[0]; // Get the first (and only) item from Data

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* You could add an image here if you have one */}
      {notFoundData.image && (
        <img 
          src={notFoundData.image} 
          alt="Not Found" 
          style={{ maxWidth: '300px', marginBottom: '20px' }}
        />
      )}
      
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        {notFoundData.name}
      </h1>
      
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px' }}>
        {notFoundData.description}
      </p>
      
      {/* Optional: Add a link to go back home */}
      <a 
        href="/" 
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        Go Back Home
      </a>
    </div>
  )
}

export default notFound