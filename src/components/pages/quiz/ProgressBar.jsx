const ProgressBar = ({ percent }) => {
    console.log(percent)
    return (
        <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: percent + '%'}}></div>
        </div>
    );
};

export default ProgressBar;