'use client';

import { useEffect, useState } from 'react';

import {
  CartFooter,
  CartHeader,
  CartItem,
  CartNotice,
  EmptyCartItem,
} from '@/components/cart';
import Header from '@/components/common/Header';
import HeaderNav from '@/components/common/HeaderNav';

import type { CartProduct } from '@/@types/cart.types';

const Cart = () => {
  const [selectCount, setSelectCount] = useState<number>(0);
  const [cartData, setCartData] = useState(mock);
  const [totalPrice, setTotalPrice] = useState(650000);

  const [cartProductList, setCartProductList] = useState<CartProduct[]>([]);

  useEffect(() => {
    mock.data.items.map((item) => {
      setCartProductList((prevCartProductList) => {
        const existingIndex = prevCartProductList.findIndex(
          (prevCartItem) => prevCartItem.productId === item.product.productId
        );
        const updatedCartList = [...prevCartProductList];
        if (existingIndex !== -1) {
          // 존재하면 숙소 안에 방만 추가
          updatedCartList[existingIndex].cartRoomList.push({
            id: item.id,
            roomId: item.product.roomId,
            imageUrl: item.product.imageUrl,
            roomName: item.product.roomName,
            baseGuestCount: item.product.baseGuestCount,
            maxGuestCount: item.product.maxGuestCount,
            price: item.product.price,
            checkInTime: item.product.checkInTime,
            checkOutTime: item.product.checkOutTime,
            stock: item.product.stock,
            checkInDate: item.checkInDate,
            checkOutDate: item.checkOutDate,
            numberOfNights: item.numberOfNights,
          });
          return updatedCartList;
        } else {
          // 존재하지 않으면 숙소 및 방 추가
          return [
            ...prevCartProductList,
            {
              productId: item.product.productId,
              productName: item.product.productName,
              address: item.product.address,
              cartRoomList: [
                {
                  id: item.id,
                  roomId: item.product.roomId,
                  imageUrl: item.product.imageUrl,
                  roomName: item.product.roomName,
                  baseGuestCount: item.product.baseGuestCount,
                  maxGuestCount: item.product.maxGuestCount,
                  price: item.product.price,
                  checkInTime: item.product.checkInTime,
                  checkOutTime: item.product.checkOutTime,
                  stock: item.product.stock,
                  checkInDate: item.checkInDate,
                  checkOutDate: item.checkOutDate,
                  numberOfNights: item.numberOfNights,
                },
              ],
            },
          ];
        }
      });
    });
  }, []);

  return (
    <>
      <Header>
        <HeaderNav showBack showHome showMyPage>
          장바구니
        </HeaderNav>
        <CartHeader
          selectCount={selectCount}
          totalCount={cartData.data.items.length}
        />
      </Header>
      <main className='mb-52 mt-[6rem]'>
        <section>
          {cartProductList.length > 0 ? (
            <ul className='pt-[0.0063rem]'>
              {cartProductList.map((cartProductItem) => (
                <CartItem
                  key={cartProductItem.productId}
                  cartProductData={cartProductItem}
                />
              ))}
            </ul>
          ) : (
            <EmptyCartItem />
          )}
        </section>
        <CartNotice />
        <CartFooter selectCount={selectCount} totalPrice={totalPrice} />
      </main>
    </>
  );
};

export default Cart;

const mock = {
  status: 'SUCCESS',
  data: {
    totalPrice: 100000,
    items: [
      {
        id: 1, // 장바구니 id
        product: {
          productId: 1, // 숙소id
          roomId: 1, // 방 id
          productName: '호텔 미드시티 명동',
          address: '서울특별시 중구 다동길 30',
          imageUrl:
            'https://yaimg.yanolja.com/v5/2023/11/18/16/6558e6531f1625.19802997.jpg',
          roomName: '코너 트윈',
          baseGuestCount: 2,
          maxGuestCount: 2,
          price: 195000,
          checkInTime: '15:00',
          checkOutTime: '12:00',
          stock: 1,
        },
        checkInDate: '2023-11-22',
        checkOutDate: '2023-11-23',
        numberOfNights: 1,
      },
      {
        id: 2, // 장바구니 id
        product: {
          productId: 2, // 숙소id
          roomId: 2, // 방 id
          productName: '태안 추억만들기펜션',
          address: '충청남도 태안군 원북면 신두해변길 157',
          imageUrl:
            'https://yaimg.yanolja.com/v5/2023/11/18/16/6558e6531f1625.19802997.jpg',
          roomName: '오션뷰 207호(주방+방/10평)',
          baseGuestCount: 2,
          maxGuestCount: 2,
          price: 59000,
          checkInTime: '15:00',
          checkOutTime: '11:00',
          stock: 1,
        },
        checkInDate: '2023-11-22',
        checkOutDate: '2023-11-24',
        numberOfNights: 2,
      },
      {
        id: 3, // 장바구니 id
        product: {
          productId: 3, // 숙소id
          roomId: 3, // 방 id
          productName: '태안 바다풍경카라반&글램핑',
          address: '충청남도 태안군 원북면 학암포길 21-75',
          imageUrl:
            'https://yaimg.yanolja.com/v5/2023/07/27/10/64c24b2e5016d4.49993756.jpg',
          roomName: '우드룸(편백나무방)',
          baseGuestCount: 2,
          maxGuestCount: 5,
          price: 65000,
          checkInTime: '15:00',
          checkOutTime: '11:00',
          stock: 1,
        },
        checkInDate: '2023-11-27',
        checkOutDate: '2023-11-29',
        numberOfNights: 2,
      },
      {
        id: 4, // 장바구니 id
        product: {
          productId: 3, // 숙소id
          roomId: 4, // 방 id
          productName: '태안 바다풍경카라반&글램핑',
          address: '충청남도 태안군 원북면 학암포길 21-75',
          imageUrl:
            'https://yaimg.yanolja.com/v5/2023/07/27/10/64c24b2e5016d4.49993756.jpg',
          roomName: '옐로우룸',
          baseGuestCount: 2,
          maxGuestCount: 5,
          price: 65000,
          checkInTime: '15:00',
          checkOutTime: '11:00',
          stock: 1,
        },
        checkInDate: '2023-11-23',
        checkOutDate: '2023-11-24',
        numberOfNights: 1,
      },
      {
        id: 5, // 장바구니 id
        product: {
          productId: 3, // 숙소id
          roomId: 5, // 방 id
          productName: '태안 바다풍경카라반&글램핑',
          address: '충청남도 태안군 원북면 학암포길 21-75',
          imageUrl:
            'https://yaimg.yanolja.com/v5/2023/07/27/10/64c24b2e5016d4.49993756.jpg',
          roomName: '레드룸',
          baseGuestCount: 2,
          maxGuestCount: 5,
          price: 65000,
          checkInTime: '15:00',
          checkOutTime: '11:00',
          stock: 3,
        },
        checkInDate: '2023-11-23',
        checkOutDate: '2023-11-24',
        numberOfNights: 1,
      },
    ],
  },
};
