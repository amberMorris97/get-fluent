import Button from './Button';
import Card from './Card';

const PhraseCard = ({ phrase, handleGetNewPhrase, handleAddToFlashcards }) => {
    return (
        <div className="phrase-card">
          <Card>
            <h3>{phrase.phrase}</h3>
            <h4>{phrase.translation}</h4>
            <Button label="Add to flashcards" onClick={handleAddToFlashcards} />
          </Card>
          <Button label="Get phrase" onClick={handleGetNewPhrase} />
        </div>
    );
};

export default PhraseCard;