const AllPhrasesPage = ({ allPhrases}) => {
    const renderAllPhrases = allPhrases.map((phrase, idx) => {
        return (
            <div key={phrase.idx} className="phrase">
                <h3>{phrase.phrase}</h3>
                <h4>{phrase.translation}</h4>
                <h4>{phrase.pronunciation}</h4>
            </div>
        );
    });

    return (
        <div className="all-phrases-page">
            <h2>All Phrases</h2>
          {renderAllPhrases}        
        </div>
    );
};

export default AllPhrasesPage;