import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDispatch, useSelector } from 'react-redux';
import { SizeMe } from 'react-sizeme';
import { getFacturePdfClient } from '../actions/userActions';
import { Col, Row, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ClientFactureDetail = ({ history, match }) => {
  const id = match.params.id;
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clientFacture = useSelector((state) => state.clientFacture);
  const { Loading, facture, error } = clientFacture;
  useEffect(() => {
    if (userInfo) {
      dispatch(getFacturePdfClient(id));
    } else {
      history.push('/');
    }
  }, [dispatch, userInfo, history]);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <Container>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <SizeMe
          monitorHeight
          refreshRate={128}
          refreshMode={'debounce'}
          render={({ size }) => (
            <div>
              <Document file={facture} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} width={size.width} size='A4' />
              </Document>
            </div>
          )}
        />
      )}
    </Container>
  );
};

export default ClientFactureDetail;
