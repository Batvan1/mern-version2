import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams(); // url'deki parametlerin değerleri alınıyor react yapısı ile

  // ALTTA @reduxjs/toolkit/query/react pakedi gönderilen isteğin değerini almak için OTOMATİK olarak DATA,isLoading ve error değişkenlerini oluşturuyor ve içerisine değerleri kendi koyuyor.
  const { data, isLoading, error } = useGetProductsQuery({ //Api isteği yapan fonksiyon burada çağırılıyor. bu fonksiyon başka dosyamızda bulunuyor.
    keyword, // url'de ki parametlerin değerlerini yukarıda görüldüğü gibi alıp , çağırdığımız fonksiyonun ata alma özelliğini kullanarak bu değerleri çalışacak olan fonksiyonumuza yolluyoruz. ve api isteği yaparken bu parametreler kullanılıyor.
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
