import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer id="footer" className="footer">
                <div className="copyright">
                    &copy; {currentYear} <strong><span>Menu app</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                    Developed by <a href="https://flipcodesolutions.com/" target='_blank'><strong>Flipcode Solutions</strong></a>
                </div>
            </footer>

            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i
                className="bi bi-arrow-up-short"></i></a>
        </>
    )
}

export default Footer