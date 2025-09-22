import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
  Modal,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { Roboto_600SemiBold } from '@expo-google-fonts/roboto/600SemiBold';
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { Candal_400Regular } from '@expo-google-fonts/candal';
import { DaysOne_400Regular } from '@expo-google-fonts/days-one';
import { BlurView } from 'expo-blur';

const image = {
  uri: 'https://brandeps.com/icon-download/S/Shopping-cart-icon-18.png',
};

export default function App() {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (produto) => {
    setCartItems((prevCart) => {
      const itemExistente = prevCart.find((item) => item.id === produto.id);
      if (itemExistente) {
        // se já existe, só aumenta a quantidade
        return prevCart.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // se não existe, adiciona novo com quantidade = 1
        return [...prevCart, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removeFromCart = (produtoId) => {
    setCartItems(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === produtoId
              ? { ...item, quantidade: item.quantidade - 1 }
              : item
          )
          .filter((item) => item.quantidade > 0) // remove os que ficarem zerados
    );
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0
  );

  // Cria o array de produtos, incluindo o id, nome do produto e valor
  const produtos = [
    {
      id: 1, //id do produto para evitar duplicidade
      nome: 'Maçã', //nome do produto
      valor: 2.5, //valor do produto
      foto: 'https://superprix.vteximg.com.br/arquivos/ids/175207/Maca-Argentina--1-unidade-aprox.-200g-.png?v=636294203590200000' /* Foto 1 */,
      fotoDoDia:
        'https://fsp.usp.br/eccco/wp-content/uploads/2022/11/matheus-cenali-wXuzS9xR49M-unsplash-1200x900.jpg' /* foto especial */,
    },
    {
      id: 2,
      nome: 'Banana',
      valor: 4.0,
      foto: 'https://vallefrutas.com.br/wp-content/uploads/banana-nanica.png  ',
      fotoDoDia:
        'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/CU6HU7WMEVF2THSPFT7RBQXFWM.jpeg',
    },
    {
      id: 3,
      nome: 'Pera',
      valor: 3.0,
      foto: 'https://phygital-files.mercafacil.com/supermercado-real-de-niteroi/uploads/produto/pera_williams_1kg_1fc5602b-abcc-4c90-9977-ff742fdc5fb4.png',
      fotoDoDia:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMagKRYlH0QQt2pTPHjJEH4EFcN0ASs9ppvQ&s',
    },
    {
      id: 4,
      nome: 'Pêssego',
      valor: 7.0,
      foto: 'https://images.tcdn.com.br/img/img_prod/450860/muda_de_pessego_aurora_com_1m_enxertada_684_1_20190611093602.jpg',
      fotoDoDia:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFLXxObuVEd3-feGTwAQ6CXskyiAVhcZZ6w&s',
    },
    {
      id: 5,
      nome: 'Kiwi',
      valor: 16.0,
      foto: 'https://static.vecteezy.com/system/resources/previews/047/831/161/non_2x/close-up-image-of-fresh-kiwi-fruit-one-whole-and-one-half-showcasing-vibrant-green-flesh-and-brown-fuzzy-skin-perfect-for-healthy-eating-concepts-png.png',
      fotoDoDia:
        'https://cdn.wikifarmer.com/images/thumbnail/2024/02/11-Fatos-Interessantes-Sobre-Kiwis-1200x630.png',
    },
  ];
  // Cria um estado fixo para o produto do dia
  const [produtoDoDia] = useState(() => {
    const randomIndex = Math.floor(Math.random() * produtos.length);
    return produtos[randomIndex];
  });

  const bemVindoAlert = () =>
    Alert.alert('Mercadinho BigBom!', 'Seja bem-vindo ao nosso primeiro APP!', [
      { text: 'Ir para o app!', onPress: () => console.log('OK Pressed') },
    ]);

  useEffect(() => {
    bemVindoAlert();
  }, []);

  let [fontsLoaded] = useFonts({
    Roboto_600SemiBold,
    BebasNeue_400Regular,
    Candal_400Regular,
    DaysOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      {/* pra fazer isso funcionar bonito em smartphones que possuam notch ou punchhole */}
      <SafeAreaView style={styles.container}>
        {/* MODAL DO CARRINHO */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={cartVisible}
          onRequestClose={() => {
            setCartVisible(!cartVisible);
          }}>
          {/* pra fazer o modal funcionar em smartphones que possuam notch ou punchhole */}
          <SafeAreaView style={styles.cartcontainer}>
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  paddingTop: 10,
                }}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.h1}>Carrinho</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  {/* botão de fechar o modal */}
                  <TouchableOpacity
                    style={[styles.closeBttn, styles.buttonClose]}
                    onPress={() => setCartVisible(!cartVisible)}>
                    <Text style={styles.h3}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1, padding: 20 }}>
                {cartItems.length === 0 ? (
                  <Text style={styles.h2}>Seu carrinho está vazio!</Text>
                ) : (
                  cartItems.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Text style={styles.h1}>
                        {item.nome} x {item.quantidade}
                      </Text>
                      <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity
                          onPress={() => removeFromCart(item.id)}
                          style={{
                            backgroundColor: '#9999',
                            borderRadius: 20,
                            width: 45,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'red',
                              fontSize: 35,
                              marginBottom: 8,
                            }}>
                            -
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => addToCart(item)}
                          style={{
                            backgroundColor: '#9999',
                            borderRadius: 20,
                            width: 45,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'green',
                              fontSize: 35,
                              marginBottom: 8,
                            }}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}
              </View>
              <View
                style={{
                  marginTop: 20,
                  borderTopWidth: 1,
                  borderColor: '#ccc',
                  paddingTop: 10,
                }}>
                <Text style={styles.h1}>Total: R${total.toFixed(2)}</Text>
              </View>
            </View>
          </SafeAreaView>
        </Modal>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.h1}>Mercadinho BigBom!</Text>
        </View>
        {/* Parte "Scrollavel" do app */}
        <ScrollView style={styles.scroll}>
          <View style={{ gap: 10 }}>
            <View style={styles.produtosDoDia}>
              <TouchableOpacity
                key={produtoDoDia.id}
                style={styles.produtoDoDia}
                onPress={() => addToCart(produtoDoDia)}>
                <Text style={styles.h1}>Produto do dia!</Text>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.h2}>{produtoDoDia.nome}</Text>
                  <Text style={styles.h2}>
                    Preço: R${produtoDoDia.valor.toFixed(2)}
                  </Text>
                </View>
                <View style={{ flex: 1, width: '100%' }}>
                  <Image
                    style={styles.produtoDoDiaImg}
                    source={
                      produtoDoDia.fotoDoDia &&
                      produtoDoDia.fotoDoDia.trim() !== ''
                        ? { uri: produtoDoDia.fotoDoDia }
                        : {
                            uri: 'https://t3.ftcdn.net/jpg/10/34/39/40/360_F_1034394041_F0TwFmDeWtjn3XXtrNjeBB7SYYfvJz6n.jpg',
                          }
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* "div" focada em organizar como um todo os produtos */}
            <View style={styles.produtos}>
              {/* criação de um loop pelos produtos para exibir cada um corretamente */}
              {produtos.map((produto) => (
                <TouchableOpacity
                  key={produto.id}
                  style={styles.produto}
                  onPress={() => addToCart(produto)}>
                  {/* organização via key, para evitar problemas com repetição */}

                  {/* Aqui é o nome do produto. */}
                  <Text style={styles.h2}>{produto.nome}</Text>

                  <Image
                    style={styles.produtoImg}
                    source={
                      produto.foto && produto.foto.trim() !== ''
                        ? { uri: produto.foto }
                        : {
                            uri: 'https://t3.ftcdn.net/jpg/10/34/39/40/360_F_1034394041_F0TwFmDeWtjn3XXtrNjeBB7SYYfvJz6n.jpg',
                          }
                    }
                  />

                  {/* Aqui é o preço do produto. */}
                  <Text style={styles.h2}>R${produto.valor.toFixed(2)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.sectfooter}></View>
          <View style={styles.sectfooter}>
            <Text style={styles.h1}>BigBom!</Text>
          </View>
          <View style={styles.sectfooter}>
            <TouchableOpacity
              style={styles.cartbttn}
              onPress={() => setCartVisible(true)}>
              {/* <Text style={styles.h1}>C</Text> */}
              <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.image}>
                <View style={styles.circle}>
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{
                      textAlignVertical: 'center',
                      textAlign: 'center',
                    }}>
                    {cartItems.reduce((acc, item) => acc + item.quantidade, 0)}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  //Aqui estão os "styles" da pagina
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  cartcontainer: {
    flex: 1,
  },
  closeBttn: {
    width: 40,
    height: 40,
    backgroundColor: '#FF2C2C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    width: '100%',
  },
  header: {
    height: 70,
    backgroundColor: '#ffffff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '10%',
    backgroundColor: '#fff',
  },
  sectfooter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 25,
    height: 25,
    flexDirection: 'row-reverse',
  },
  circle: {
    width: 15,
    height: 15,
    backgroundColor: '#FF2C2C',
    borderRadius: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 25,
    fontFamily: 'DaysOne_400Regular',
  },
  h2: {
    fontSize: 20,
    fontFamily: 'DaysOne_400Regular',
  },
  h3: {
    fontSize: 15,
    fontFamily: 'DaysOne_400Regular',
  },
  produtosDoDia: {
    marginTop: 10,
    gap: 10,
    width: '100%',
    alignItems: 'center',
  },
  produtoDoDia: {
    alignItems: 'center',
    width: '94%',
    height: 300,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    elevation: 5, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  produtoDoDiaImg: {
    flex: 1,
    borderRadius: 25,
  },
  produtos: {
    gap: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  produto: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 170,
    height: 240,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 3, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    /* flexDirection: 'column-reverse', */
  },
  produtoImg: {
    height: '75%',
    width: '100%',
    borderRadius: 10,
  },
  cartbttn: {
    alignItems: 'center',
    justifyContent: 'center',
    /* backgroundColor: '#333', */
    width: 60,
    height: 60,
    borderRadius: 15,
  },
});
