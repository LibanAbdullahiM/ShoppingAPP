import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Image, TouchableOpacity, Dimensions, Pressable, Modal } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import { LISTPRODUCTS } from '../../constants/Data';
import Products from '../../components/Home/Products';

const base64 = require('base-64');

const {width} = Dimensions.get("window");
const height = width * 0.6;

const ProductDetails = ({navigation, route}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [active, setActive] = useState(0);
    const scrollRef = useRef();
    const [imageIndexes, setImageIndexes] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [userdetails, setUserdetails] = useState({});

    const {product, title} = route.params;

    const userName = userdetails.userName;
    const password = userdetails.password;

    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));

    const getProductImages = async () =>{

        setImageIndexes([]);

        try {
            
           

            const response = await fetch('http://192.168.1.104:8080/api/v1/products/' + product?.id + '/images');
            if(response.ok){
                const data = await response.json();
                console.log("Images size: " + data);
                for(let i = 0; i < data; i++){
                    setImageIndexes(oldArray => [...oldArray, i])
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {

        try {
            const userdetails = await AsyncStorage.getItem('UserDetails');
            if(userdetails !== null){

                setUserdetails(JSON.parse(userdetails));

            }
        } catch (error) {
            console.log(error)
        }
    }



    
    useFocusEffect(

        React.useCallback(() => {

            getData();
            getProductImages();
            console.log("THE PRODUCT DETAILS SCREEN WAS FOCUSED!")

            return () => {
                // Do something when the screen is unfocused
                   console.log("THE PRODUCT DETAILS SCREEN WAS UNFOCUSED!")
                 };

        }, [navigation])
      );

      console.log(imageIndexes);

    scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });

    //change the pagination active status
    const changeActiveStatus = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== active){
            setActive(slide);
        }
    }

    const showModal = () => {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      };

      const addToCart = async () => {

        try {
            const response = await fetch('http://192.168.1.104:8080/api/v1/shopping-carts/products/' + product?.id + '/add', {
                method: 'POST',
                headers: headers
            });

            if(response.ok){
                const data = await response.json();
                showModal();
                console.log("Carts are Loaded........................!")
            }

        } catch (error) {
            console.log(error);
        }
      }
   

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={{width: '100%', height: 30, flexDirection: 'row', alignItems: 'center',}}>
                    <TouchableOpacity style={styles.back_button} onPress={() => navigation.goBack()}>
                    <Image style={styles.back_Icon} source={width < 450 ? require("../../assets/icons/back-white.png") : require("../../assets/icons/back.png")}/>
                    </TouchableOpacity>
                    <Text style={[styles.large_txt, {marginLeft: 10,}]}>{product?.name.slice(0, 35)} .........</Text>
                </View>
            </View>
       
            <ScrollView ref={scrollRef} style={[styles.container, {position: 'relative',   backgroundColor: width < 500 ? 'rgba(0, 0, 0, 1)' : '#fff', top: 60,}]} contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
        }} refreshControl={
            <RefreshControl refreshing={false}/>
        }
        showsVerticalScrollIndicator={false}>
            <View style={[styles.image_view, {justifyContent: 'center', alignItems: 'center'}]}>
                <ScrollView 
                    pagingEnabled 
                    horizontal
                    onScroll={changeActiveStatus}
                    scrollEventThrottle={0}
                    showsHorizontalScrollIndicator={false} 
                    style={styles.image_view}
                    contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                    {
                        imageIndexes.map(i => {
                            console.log("PRODUCT ID: " + product.id);
                            return  <Image key={i} style={styles.imge}  source={{                                                                                                                                   
                                uri: 'http://192.168.1.104:8080/api/v1/products/'+ product?.id +'/images/' + i
                            }}/>
                        })
                    }

                </ScrollView>
                {/* <View style={styles.paginationDot}>
                    {
                        images.map((i, k) => {
                            return <Text key={k} style={k === active ? styles.paginationActiveText : styles.paginationText}>⬤</Text>
                        })
                    }
                </View> */}
                <View style={styles.pagination}>
                    {
                        imageIndexes.map((i, k) => {
                            return  <View key={k} style={styles.paginationImageView}>
                                        <Image style={k === active ? styles.paginationActiveImage : styles.paginationImage} source={{                                                                                                                                   
                                                uri: 'http://192.168.1.104:8080/api/v1/products/'+ product?.id +'/images/' + i
                                            }}/>
                                    </View>
                        })
                    }
                </View>
            </View>
            <View style={styles.product_details}>
                <TouchableOpacity style={[styles.info, styles.pricae]}>
                    <Text style={[styles.large_txt, {marginLeft: 16, color: '#0BB798'}]}>${product?.price}</Text>
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={[styles.small_txt, {color: '#0BB798'}]}>{product?.brand}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.large_txt}>{product?.name}</Text>
                </View>
                <View style={[styles.info, {marginTop: 12,}]}>
                        <Text style={[styles.small_txt, {textAlign: 'auto'}]}>{loadMore ? product?.description : `${product?.description.slice(0, 250)}....`}</Text>
                </View>
                <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}} onPress={() => setLoadMore(!loadMore)}>
                    <Text style={[styles.large_txt, {color: '#4ab8f7'}]}>{loadMore ? 'Свернуть ':'Читать полностью..... '}</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.btn, {backgroundColor: 'rgba(201, 4, 4, 1)'}]}>
                        <Text style={[styles.large_txt, {color: '#FFF'}]}>Купит Сейчас</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: '#0BB798'}]}
                                    onPress={() => addToCart()}>
                        <Text style={[styles.large_txt, {color: '#FFF'}]}>В корзину</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                }}
                animationType='slide'
                hardwareAccelerated>
                <View style={styles.modal_view}>
                    <View style={styles.success_modal}>
                        {/* <View style={styles.success_title}>
                            <Text style={styles.small_txt}>Успешно добавлен товар в корзину</Text>
                        </View> */}
                        <View style={styles.success_body}>
                             <View style={styles.modal_image_view}>
                                <Image style={styles.modal_image} source={{                                                                                                                                   
                                                uri: 'http://192.168.1.104:8080/api/v1/products/'+ product?.id +'/images/' + 0
                                            }}/>
                             </View>
                             <View style={styles.success_info}>
                                <Text style={[styles.small_txt, {color: '#fff'}]}>{product?.name.slice(0, 15)}....</Text>
                                <Text style={[styles.small_txt, {color: '#fff'}]}>${product?.price}</Text>
                             </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,

        backgroundColor: width < 500 ? '#202B3F' : 'rgba(205, 194, 194, 0.52)',
    },
    image_view:{
        width: width,
        height: height,

        backgroundColor: '#fff'
    },
    imge: {
        width: width,
        height:height,
        resizeMode: 'contain',
    },
/*     paginationDot: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
        },
    paginationText: {
        fontSize: 30,
        color: '#999',
        margin: 3,
        },
    paginationActiveText: {
        fontSize: 30,
        color: '#000',
        margin: 3,
        }, */
    pagination: {
        width: 45,
        height: 45,
        flexDirection: 'row',
        position: 'absolute',
        left: 10,
        bottom: 0,
        alignSelf: 'center',
        padding: 4,
    },
    paginationImageView: {
        width: '100%',
        height: '100%',
        margin: 4,
        borderWidth: 0.4,
        borderRadius: 0,
    },
    paginationImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.2,
        borderRadius: 8,
    },
    paginationActiveImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'center',
    },
    product_details: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        padding: 8,
        marginBottom: '30%',

        borderBottomWidth: 0.4,

    },
    info: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        
    },
    pricae: {
        height: 35,
        borderWidth: 0.2,
        borderRadius: 2,
        marginBottom: 12,

        borderColor: width < 500 ? '#fff' : '#000',

        shadowColor: "#74858C",

        shadowOpacity: 0.5,
        shadowRadius: 9.11,

        elevation: 2,
    },
    small_txt:{
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.25,
        fontFamily: 'RobotoRegular', 
        color: width < 450 ? '#fff' : '#000',
        textAlign: 'justify',
    },
    large_txt: {
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium',
        color: width < 450 ? '#fff' : '#000',
        textAlign: 'justify',
    },
    back_button: {
        width: 30,
        height: 23,
    },
    back_Icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    buttons: {
        width: '100%',
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        padding: 4,
    },
    btn: {
        width: "49%",
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,

    },
    statusBar: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal_view: {
        width: '90%',
        alignItems: "center",
        justifyContent: 'center',
        position: 'absolute',
        bottom: width < 450 ? '16.5%' : '13%',
        left: '5%',
        backgroundColor: '#4BB543',

        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#4BB543',

    },
    success_modal: {
        width: '100%',
        height: 50,
        backgroundColor: '#4BB543',

        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#4BB543',
    },
    success_body: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    modal_image_view: {
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,

        borderRadius: 8,
    },
    
    modal_image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 8,
    },
    success_info: {
        width: '75%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
})

export default ProductDetails;