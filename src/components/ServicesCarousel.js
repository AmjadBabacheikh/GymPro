import React, { useState, useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import { getServices } from '../actions/coursActions';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ServicesCarousel = () => {
  const dispatch = useDispatch();
  const servicesList = useSelector((state) => state.servicesList);
  const { Loading, services, error } = servicesList;
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return Loading ? (
    <Loader />
  ) : error ? (
    <Message varaint='danger'>{error}</Message>
  ) : (
    <>
      <Carousel pause='hover' className='bg-primary my-3'>
        {services.map((service) => (
          <Carousel.Item
            key={service.id}
            pause='hover'
            className='bg-secondary'
          >
            <Link to={`/services/${service.id}`}>
              <Image
                src={service.image}
                alt={service.description}
                fluid
                style={{ width: '40rem', borderRadius: 50 }}
              />
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  <span>{service.description}</span>
                  <span className='px-1' style={{ color: '#ee6f57' }}>
                    {service.prix} DH
                  </span>{' '}
                  <br />
                  <span className='px-1'> {service.duree} Mois</span>
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
