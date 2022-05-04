import React from 'react';

function Footer() {
    const footerYear = new Date().getFullYear();

    return (
        <footer className='footer p-10 bg-gray-700 text-primary-content footer-center'>
            <div>

                <p>Copyright &copy; {footerYear}  {process.env.APP_VERSION}</p>
            </div>
    </footer>
    )
}

export default Footer
