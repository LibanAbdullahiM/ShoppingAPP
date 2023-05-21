import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useRef } from 'react';
import Header from '../../components/Header';
import { LISTPRODUCTS } from '../../constants/Data';
import Products from '../../components/Home/Products';

const {width} = Dimensions.get("window");
const height = width * 0.6;


const ProductDetails = ({navigation, route}) => {

    const [active, setActive] = useState(0);
    const scrollRef = useRef();

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

    const {item} = route.params;
    const images = [
        item.image,
        item.image,
        item.image,
        item.image,
        item.image,
    ]

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={{width: '100%', height: 30, flexDirection: 'row', alignItems: 'center',}}>
                    <TouchableOpacity style={styles.back_button} onPress={() => navigation.goBack()}>
                        <Image style={styles.back_Icon} source={require("../../assets/icons/back.png")}/>
                    </TouchableOpacity>
                    <Text style={[styles.large_txt, {marginLeft: 10,}]}>{item.name}</Text>
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
                        images.map((img, index) => {
                            return  <Image key={index} style={styles.imge} source={img}/>
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
                        images.map((im, k) => {
                            return  <View key={k} style={styles.paginationImageView}>
                                        <Image style={k === active ? styles.paginationActiveImage : styles.paginationImage} source={item.image}/>
                                    </View>
                        })
                    }
                </View>
            </View>
            <View style={styles.product_details}>
                <TouchableOpacity style={[styles.info, styles.pricae]}>
                    <Text style={[styles.large_txt, {marginLeft: 16, color: '#0BB798'}]}>${item.price}</Text>
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={[styles.small_txt, {color: '#0BB798'}]}>Brand</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.large_txt}>{item.name}</Text>
                </View>
                <View style={[styles.info, {marginTop: 12,}]}>
                    <Text style={[styles.small_txt, {textAlign: 'justify'}]}>{item.description}</Text>
                </View>
            </View>
            <Products products={LISTPRODUCTS} title='Похожие Товары' navigation={navigation} route={route}/>
            </ScrollView>
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.btn, {backgroundColor: 'rgba(201, 4, 4, 1)'}]}>
                        <Text style={[styles.large_txt, {color: '#FFF'}]}>Купит Сейчас</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, {backgroundColor: '#0BB798'}]}>
                        <Text style={[styles.large_txt, {color: '#FFF'}]}>В корзину</Text>
                </TouchableOpacity>
            </View>
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
        width: 35,
        height: 35,
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
        borderRadius: 8,
    },
    paginationImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'center',
        opacity: 0.2
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
        fontSize: 12,
        fontFamily: 'InterLight',
        color: width < 500 ? '#fff' : '#000',
    },
    large_txt: {
        fontSize: 16,
        fontFamily: 'InterMedium',
        color: width < 500 ? '#fff' : '#000',
    },
    back_button: {
        width: 30,
        height: 30,
    },
    back_Icon: {
        width: '100%',
        height: '100%',
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
})

export default ProductDetails;