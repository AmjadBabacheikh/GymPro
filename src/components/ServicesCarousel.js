import React, { useState, useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import { getServices } from '../actions/coursActions';
import { Link } from 'react-router-dom';
import { base64StringToBlob } from 'blob-util';

const ServicesCarousel = () => {
  const dispatch = useDispatch();
  const servicesList = useSelector((state) => state.servicesList);
  const { Loading, services, error } = servicesList;
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const convertToImage = (response) => {
    var contentType = 'image/png';
    const blob = base64StringToBlob(response, contentType);
    var blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  };
  return Loading ? (
    <Loader />
  ) : error ? (
    <Message varaint='danger'>{error}</Message>
  ) : (
    <>
      <Carousel pause='hover' className='bg-primary my-3'>
        {services.map((item) => (
          <Carousel.Item
            key={item.service.id}
            pause='hover'
            className='bg-secondary'
          >
            <Link to={`/services/${item.service.id}`}>
              <Image
                src={convertToImage(item.imgBytes)}
                alt={item.service.description}
                fluid
                style={{ width: '40rem', borderRadius: 50 }}
              />
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  <span>{item.service.description}</span>
                  <span className='px-1' style={{ color: '#ee6f57' }}>
                    {item.service.prix} DH
                  </span>{' '}
                  <br />
                  <span className='px-1'> {item.service.duree} Months</span>
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ServicesCarousel;
