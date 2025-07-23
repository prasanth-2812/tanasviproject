import React from 'react';
import { Link } from 'react-router-dom';

interface PageTitleProps {
    title: string;
    breadcrumb: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, breadcrumb }) => {
    return (
        <div className="breadcrumb-wrapper bg-cover" style={{ backgroundImage: "url('/assets/img/breadcrumb.jpg')" }}>
            <div className="border-shape">
                <img src="/assets/img/element.png" alt="shape-img" />
            </div>
            <div className="line-shape">
                <img src="/assets/img/line-element.png" alt="shape-img" />
            </div>
            <div className="container">
                <div className="page-heading">
                    <h1 className="wow fadeInUp" data-wow-delay=".3s">{title}</h1>
                    <ul className="breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <i className="fas fa-chevron-right"></i>
                        </li>
                        <li>{breadcrumb}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PageTitle;