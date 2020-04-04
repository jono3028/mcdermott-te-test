import React, { useState } from 'react';
import './MovieCard.css';

import { Card, Image, Modal, Icon } from 'semantic-ui-react';

export const MovieCard = props => {
  const { data, onToggleFavorite } = props;
  const [displayModal, setDisplaymodal] = useState(false);
  const [isFav, setIsFav] = useState(data.favorite);

  const formattedDate = data.ukRelease.format('D MMMM YYYY');
  const releaseDateString = formattedDate;
  const leadActorString = `Lead Actor: ${data.leadActor}`;
  const boxOffice = `Box Office: ${data.boxOfficeTake}`;

  const handleOnFavClick = (uuid) => {
    setIsFav(!isFav)
    onToggleFavorite(uuid)
  }

  const isFavIcon = isFav ? 'heart' : 'heart outline'
  const renderFavIcon = <Icon className="moviecard moviecard_favicon" name={isFavIcon} onClick={() => handleOnFavClick(data.filmID)} />

  const cardColour = isFav ? 'blue' : null;
  
  return (
    <div className="moviecard" >
    <Card color={cardColour}>
      <Image src={data.imageURL} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <span className='date'>{data.filmTitle}</span>
          {renderFavIcon} 
        </Card.Header>
        <Card.Meta>{releaseDateString}</Card.Meta>
        <Card.Description>{leadActorString}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a onClick={() => setDisplaymodal(true)}>
          <Icon name='glass martini' />
          <span>More...</span>
        </a>
      </Card.Content>
      <Modal open={displayModal} onClose={() => setDisplaymodal(false)} centered={false}>
        <Modal.Header>
          {data.filmTitle}
          {renderFavIcon}
        </Modal.Header>
        <Modal.Content image>
          <Image src={data.imageURL} />
          <Modal.Description>
            <p>{releaseDateString}</p>
            <p>{leadActorString}</p>
            <p>{boxOffice}</p>
            <p>{data.description}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Card>
    </div>
  )
}