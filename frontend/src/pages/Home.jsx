import HomeNavbar from "../components/HomeNavbar";

function Home() {
  return (
    <>
      {/* Inline CSS */}
      <style>
        {`
          .home-container {
            min-height: 100vh;
            background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            color: white;
            display: flex;
            flex-direction: column;
          }

          .search-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          }

          .search-tabs .nav-link {
            color: #333;
            font-weight: 500;
            border: none;
            padding: 12px 20px;
          }

          .search-tabs .nav-link.active {
            color: #0d6efd;
            background: transparent;
            border-bottom: 3px solid #0d6efd;
          }

          .form-control, .form-select {
            padding: 12px 15px;
            border-radius: 8px;
          }

          .hero-text {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          .cta-button {
            padding: 12px 30px;
            font-weight: 600;
            border-radius: 8px;
            background: #0d6efd;
            border: none;
            transition: all 0.3s;
          }

          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(13, 110, 253, 0.4);
          }

          .benefits-container {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 20px;
            margin-top: 30px;
          }

          .benefit-item {
            text-align: center;
            padding: 15px;
          }

          .benefit-icon {
            font-size: 2rem;
            color: #0d6efd;
            margin-bottom: 10px;
          }
        `}
      </style>

      <div className="home-container">
        <HomeNavbar />

        <div className="container my-auto py-5">
          <div className="row">
            <div className="col-lg-6 mb-5">
              <h1 className="hero-text display-4 fw-bold mb-4">
                Book Your Perfect Flight
              </h1>
              <p className="hero-text lead mb-4">
                Find the best deals on flights worldwide. Compare prices, save
                money, and travel smarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
