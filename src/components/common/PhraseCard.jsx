import Card from "./Card";

const PhraseCard = ({ phrase }) => {
    return (
        <div className="phrase-card">
          <Card>
            <h3>Test Phrase 1</h3>
            <h4>Test Translation 1</h4>
          </Card>
        </div>
    );
};

export default PhraseCard;