import { Link } from "react-router"

const ResourceLink = ({ title, description, url }) => {
    return (
      <div className="org-link">
        <Link to={url} className="resource">
            <h5 className="resource-title">{title}</h5>
            <span>{description}</span>
        </Link>
      </div>
    );
};

export default ResourceLink;