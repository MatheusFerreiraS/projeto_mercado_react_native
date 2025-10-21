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
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons/faClockRotateLeft';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
} from '@expo-google-fonts/open-sans';

library.add(
  fab,
  faPlus,
  faChevronDown,
  faMinus,
  faTrash,
  faList,
  faGripVertical,
  faCartShopping,
  faMagnifyingGlass,
  faCode
);

export default function App() {
  const bemVindoAlert = () =>
    Alert.alert('Mercadinho BigBom!', 'Seja bem-vindo ao nosso primeiro APP!', [
      { text: 'Ir para o app!', onPress: () => console.log('OK Pressed') },
    ]);

  const avisocompra = () =>
    Alert.alert('Mercadinho BigBom!', 'Seria muito bom essa função, né?', [
      { text: 'Retornar!', onPress: () => console.log('OK Pressed') },
    ]);

  useEffect(() => {
    bemVindoAlert();
  }, []);

  const [cartVisible, setCartVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [productSearch, onSearchChange] = useState('');
  const [chosenCategory, setChosenCategory] = useState('');

  const onCategoryChange = (categoria) => {
    setChosenCategory(chosenCategory === categoria ? '' : categoria);
  };

  const selectProduct = (produto) => {
    setSelectedProduct(() => {
      return produto;
    });
  };

  const addToCart = (produto) => {
    setCartItems((prevCart) => {
      const itemExistente = prevCart.find((item) => item.id === produto.id);
      if (itemExistente) {
        // se já existe, só aumenta a quantidade
        return prevCart.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + productQuantity }
            : item
        );
      } else {
        // se não existe, adiciona novo com quantidade = 1
        return [...prevCart, { ...produto, quantidade: productQuantity }];
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

  const categorias = [
    {
      id: 1,
      nome: 'Frutas',
    },
    {
      id: 2,
      nome: 'Vegetais',
    },
    {
      id: 3,
      nome: 'Carnes',
    },
    {
      id: 4,
      nome: 'Bebidas',
    },
    {
      id: 5,
      nome: 'Padaria',
    },
    {
      id: 6,
      nome: 'Laticínios',
    },
    {
      id: 7,
      nome: 'Higiene e Limpeza',
    },
    {
      id: 8,
      nome: 'Congelados',
    },
  ];

  // Cria o array de produtos, incluindo o id, nome do produto e valor
  const produtos = [
    {
      id: 1,
      nome: 'Maçã',
      categoria: 'Frutas',
      valor: 2.5,
      foto: 'https://superprix.vteximg.com.br/arquivos/ids/175207/Maca-Argentina--1-unidade-aprox.-200g-.png?v=636294203590200000',
      fotoDoDia:
        'https://fsp.usp.br/eccco/wp-content/uploads/2022/11/matheus-cenali-wXuzS9xR49M-unsplash-1200x900.jpg',
      pesoMedio: '200g',
      descricao:
        'A maçã é uma fruta doce e suculenta, rica em fibras e antioxidantes, ideal para lanches saudáveis.',
      nutrientes: {
        calorias: '52 kcal',
        carboidratos: '14g',
        proteinas: '0.3g',
        gorduras: '0.2g',
        fibras: '2.4g',
        vitaminaC: '7% VD',
      },
    },
    {
      id: 2,
      nome: 'Banana',
      valor: 4.0,
      categoria: 'Frutas',
      foto: 'https://phygital-files.mercafacil.com/big_mart/uploads/produto/banana_nanica_kg_542d7c7f-a75e-4cd9-858b-0e2b3a6612c1.png',
      fotoDoDia:
        'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/CU6HU7WMEVF2THSPFT7RBQXFWM.jpeg',
      pesoMedio: '120g',
      descricao:
        'A banana é fonte rápida de energia e rica em potássio, ajudando no bom funcionamento dos músculos.',
      nutrientes: {
        calorias: '89 kcal',
        carboidratos: '23g',
        proteinas: '1.1g',
        gorduras: '0.3g',
        fibras: '2.6g',
        potassio: '12% VD',
      },
    },
    {
      id: 3,
      nome: 'Pera',
      valor: 3.0,
      categoria: 'Frutas',
      foto: 'https://phygital-files.mercafacil.com/supermercado-real-de-niteroi/uploads/produto/pera_williams_1kg_1fc5602b-abcc-4c90-9977-ff742fdc5fb4.png',
      fotoDoDia:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMagKRYlH0QQt2pTPHjJEH4EFcN0ASs9ppvQ&s',
      pesoMedio: '180g',
      descricao:
        'A pera é macia, levemente adocicada e excelente para hidratação, já que possui alto teor de água.',
      nutrientes: {
        calorias: '57 kcal',
        carboidratos: '15g',
        proteinas: '0.4g',
        gorduras: '0.1g',
        fibras: '3.1g',
        vitaminaC: '7% VD',
      },
    },
    {
      id: 4,
      nome: 'Pêssego',
      valor: 7.0,
      categoria: 'Frutas',
      foto: 'https://phygital-files.mercafacil.com/supermercado-real-de-niteroi/uploads/produto/p_ssego_1kg_c3465174-3567-4094-b66c-b43186873787.png',
      fotoDoDia:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFLXxObuVEd3-feGTwAQ6CXskyiAVhcZZ6w&s',
      pesoMedio: '150g',
      descricao:
        'O pêssego é uma fruta aromática e refrescante, rica em vitamina C e fibras para uma boa digestão.',
      nutrientes: {
        calorias: '39 kcal',
        carboidratos: '10g',
        proteinas: '0.9g',
        gorduras: '0.3g',
        fibras: '1.5g',
        vitaminaC: '11% VD',
      },
    },
    {
      id: 5,
      nome: 'Kiwi',
      valor: 16.0,
      categoria: 'Frutas',
      foto: 'https://static.vecteezy.com/system/resources/previews/047/831/161/non_2x/close-up-image-of-fresh-kiwi-fruit-one-whole-and-one-half-showcasing-vibrant-green-flesh-and-brown-fuzzy-skin-perfect-for-healthy-eating-concepts-png.png',
      fotoDoDia:
        'https://cdn.wikifarmer.com/images/thumbnail/2024/02/11-Fatos-Interessantes-Sobre-Kiwis-1200x630.png',
      pesoMedio: '75g',
      descricao:
        'O kiwi tem sabor levemente ácido e é uma das frutas mais ricas em vitamina C, fortalecendo a imunidade.',
      nutrientes: {
        calorias: '61 kcal',
        carboidratos: '15g',
        proteinas: '1.1g',
        gorduras: '0.5g',
        fibras: '3g',
        vitaminaC: '83% VD',
      },
    },
    {
      id: 6,
      nome: 'Abobrinha',
      valor: 8.0,
      categoria: 'Vegetais',
      foto: 'https://framerusercontent.com/images/DTYHvxD0OnccJ86UkD0Zp9z74U.png?width=1080&height=1080',
      fotoDoDia:
        'https://ceagesp.gov.br/wp-content/uploads/2016/10/portalbobrinhabrasileira-600x469.jpg',
      pesoMedio: '75g',
      descricao:
        'A abobrinha é leve e versátil, ótima para refogados e grelhados.',
      nutrientes: {
        calorias: '17 kcal',
        carboidratos: '3g',
        proteinas: '1.2g',
        gorduras: '0.3g',
        fibras: '1g',
        vitaminaC: '29% VD',
      },
    },
    {
      id: 7,
      nome: 'Picanha',
      valor: 68.0,
      categoria: 'Carnes',
      foto: 'https://phygital-files.mercafacil.com/celeiromorrinhos/uploads/produto/carne_bovina_picanha_kg_4d652a49-ed5e-4941-9030-3d13514ba326.png',
      fotoDoDia:
        'https://irp.cdn-website.com/33406c6e/dms3rep/multi/picanha-aa0c51c6.jpg',
      pesoMedio: '1kg',
      descricao:
        'A picanha é um corte nobre, suculento e macio, perfeito para churrascos.',
      nutrientes: {
        calorias: '250 kcal',
        carboidratos: '0g',
        proteinas: '26g',
        gorduras: '17g',
        fibras: '0g',
        ferro: '15% VD',
      },
    },
    {
      id: 8,
      nome: 'Pão Francês',
      valor: 12.0,
      categoria: 'Padaria',
      foto: 'https://cdn.awsli.com.br/800x800/1949/1949076/produto/307644056/pao-de-sal-hi1c8gtdpp.png',
      fotoDoDia:
        'https://guiadacozinha.com.br/wp-content/uploads/2018/10/paofrancesfolhado.jpg',
      pesoMedio: '50g',
      descricao:
        'Pão crocante por fora e macio por dentro, ideal para café da manhã.',
      nutrientes: {
        calorias: '135 kcal',
        carboidratos: '28g',
        proteinas: '4g',
        gorduras: '1g',
        fibras: '1g',
        sodio: '8% VD',
      },
    },
    {
      id: 9,
      nome: 'Leite Integral',
      valor: 5.5,
      categoria: 'Laticínios',
      foto: 'https://www.frimesa.com.br/upload/image/product/leite-integral2-74-59.png',
      fotoDoDia:
        'https://s2-oglobo.glbimg.com/_86_pBxpzM4e40drYhNoCf2aCvA=/0x0:22945x10231/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/V/U/yjvs4DQ06ni0A8IA9vNg/fresh-milk-mug-jug-wooden-table-1-.jpg',
      pesoMedio: '1L',
      descricao:
        'Leite integral rico em cálcio, ideal para acompanhar refeições e receitas.',
      nutrientes: {
        calorias: '61 kcal (100ml)',
        carboidratos: '5g',
        proteinas: '3.2g',
        gorduras: '3.3g',
        calcio: '12% VD',
      },
    },
    {
      id: 10,
      nome: 'Queijo Mussarela',
      valor: 42.0,
      categoria: 'Laticínios',
      foto: 'https://d21wiczbqxib04.cloudfront.net/jH_C5UUL72tHNpKjj3kHikogNrc=/1600x0/smart/https://osuper-ecommerce-supernahora.s3.sa-east-1.amazonaws.com/38e9ed0c-queijomucarelakg.png',
      fotoDoDia:
        'https://www.mundoboaforma.com.br/wp-content/uploads/2022/03/mussarela.webp',
      pesoMedio: '100g',
      descricao:
        'Queijo mussarela saboroso e macio, perfeito para lanches, pizzas e gratinados.',
      nutrientes: {
        calorias: '280 kcal (100g)',
        carboidratos: '2g',
        proteinas: '22g',
        gorduras: '20g',
        calcio: '50% VD',
      },
    },
    {
      id: 11,
      nome: 'Coca-Cola 2L',
      valor: 10.0,
      categoria: 'Bebidas',
      foto: 'https://superrissul.vtexassets.com/arquivos/ids/821915-800-auto?v=638902806708530000&width=800&height=auto&aspect=true',
      fotoDoDia:
        'https://clubwix.com.br/wp-content/uploads/2021/11/13479068486_jack-coke-1.jpg',
      pesoMedio: '2L',
      descricao:
        'Refrigerante sabor cola, refrescante e ideal para acompanhar refeições.',
      nutrientes: {
        calorias: '85 kcal (200ml)',
        carboidratos: '22g',
        proteinas: '0g',
        gorduras: '0g',
        sodio: '1% VD',
      },
    },
    {
      id: 12,
      nome: 'Detergente Neutro',
      valor: 2.5,
      categoria: 'Higiene e Limpeza',
      foto: 'https://acdn-us.mitiendanube.com/stores/001/289/535/products/mockup-minuano-clear-78976641300431-123d350bc08e0bec5f16261858100880-1024-1024.png',
      fotoDoDia:
        'https://acdn-us.mitiendanube.com/stores/001/289/535/products/403480-6_21-7c9edf615264d4d66d16832055654012-1024-1024.png',
      pesoMedio: '500ml',
      descricao: 'Detergente neutro ideal para limpeza de louças e utensílios.',
    },
    {
      id: 13,
      nome: 'Pizza Congelada',
      valor: 22.0,
      categoria: 'Congelados',
      foto: 'https://fortatacadista.vteximg.com.br/arquivos/ids/318352-800-800/7893000671997_99_1_1200_72_RGB.png?v=638890508948400000',
      fotoDoDia:
        'https://cloudfront-us-east-1.images.arcpublishing.com/estadao/SECNWCDRKNH3XNUFHPIQPJXTNQ.jpg',
      pesoMedio: '450g',
      descricao:
        'Pizza congelada sabor mussarela, prática e deliciosa para qualquer ocasião.',
      nutrientes: {
        calorias: '250 kcal (1 fatia)',
        carboidratos: '30g',
        proteinas: '12g',
        gorduras: '10g',
        fibras: '2g',
        sodio: '20% VD',
      },
    },
  ];

  // Cria um estado fixo para o produto do dia
  const [produtoDoDia] = useState(() => {
    const randomIndex = Math.floor(Math.random() * produtos.length);
    return produtos[randomIndex];
  });

  const [randomIndex] = useState(() => {
    return Math.floor(Math.random() * produtos.length);
  });
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  const footer = [
    {
      id: 1,
      iconName: faMagnifyingGlass,
      iconSize: 30,
      iconText: 'Busca',
      pressFunction: () => {
        setSearchVisible(true);
      },
    },
    {
      id: 2,
      iconName: faCode,
      iconSize: 30,
      iconText: 'Sobre o APP',
      pressFunction: () => {
        setAboutVisible(true);
      },
    },
    {
      id: 3,
      iconName: faCartShopping,
      iconSize: 30,
      iconText: 'Sacola',
      pressFunction: () => {
        setCartVisible(true);
      },
    },
  ];
  return (
    <SafeAreaProvider>
      {/* pra fazer isso funcionar bonito em smartphones que possuam notch ou punchhole */}
      <SafeAreaView style={styles.container}>
        {/* MODAL DO PRODUTO */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={productVisible}
          onRequestClose={() => {
            setProductVisible(!productVisible);
          }}>
          {/* Esperando o produto ser escolhido para gerar as informações */}
          {selectedProduct.length === 0 ? null : (
            <SafeAreaView style={styles.container}>
              <View style={styles.modalProdutoBase}>
                <ImageBackground
                  style={styles.selectedproductimage}
                  source={
                    selectedProduct.fotoDoDia &&
                    selectedProduct.fotoDoDia.trim() !== ''
                      ? { uri: selectedProduct.fotoDoDia }
                      : {
                          uri: 'https://t3.ftcdn.net/jpg/10/34/39/40/360_F_1034394041_F0TwFmDeWtjn3XXtrNjeBB7SYYfvJz6n.jpg',
                        }
                  }>
                  <View style={styles.closebttncontainer}>
                    {/* botão de fechar o modal */}
                    <TouchableOpacity
                      style={styles.closeBttn}
                      onPress={() => {
                        setProductVisible(!productVisible);
                        setProductQuantity(1);
                      }}>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.modalProdutoTexto}>
                <Text style={styles.h1}>{selectedProduct.nome}</Text>
                <Text style={styles.h3}>{selectedProduct.descricao}</Text>
                {selectedProduct && selectedProduct.nutrientes && (
                  <FlatList
                    data={Object.entries(selectedProduct.nutrientes)} // transforma objeto em array
                    renderItem={({ item }) => (
                      <Text style={styles.h3}>
                        {item[0]}: {item[1]}
                      </Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )}
              </View>
              <View style={styles.modalProdutoDivAdicionar}>
                {productQuantity > 1 ? (
                  <TouchableOpacity
                    onPress={() => setProductQuantity(productQuantity - 1)}
                    style={styles.quantitybutton}>
                    <FontAwesomeIcon icon={faMinus} style={{ color: 'red' }} />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.quantitybutton}>
                    <FontAwesomeIcon icon={faMinus} style={{ color: 'gray' }} />
                  </View>
                )}
                <Text style={styles.h2}>{productQuantity}</Text>
                <TouchableOpacity
                  onPress={() => setProductQuantity(productQuantity + 1)}
                  style={styles.quantitybutton}>
                  <FontAwesomeIcon icon={faPlus} style={{ color: 'green' }} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addcart}
                  onPress={() => {
                    addToCart(selectedProduct);
                    setProductVisible(!productVisible);
                    setProductQuantity(1);
                  }}>
                  <Text style={styles.addcarttext}>Adicionar</Text>
                  <Text style={styles.addcarttext}>
                    R${' '}
                    {(selectedProduct.valor * productQuantity)
                      .toFixed(2)
                      .replace('.', ',')}
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          )}
        </Modal>
        {/* MODAL DO CARRINHO */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={cartVisible}
          onRequestClose={() => {
            setCartVisible(!cartVisible);
          }}>
          <SafeAreaView style={styles.container}>
            <View style={styles.modalHeader}>
              <View style={styles.containerLateralHeader}>
                {/* botão de fechar o modal */}
                <TouchableOpacity
                  style={styles.closeBttn}
                  onPress={() => setCartVisible(!cartVisible)}>
                  <FontAwesomeIcon icon={faChevronDown} />
                </TouchableOpacity>
              </View>
              <View style={styles.containerCentralHeader}>
                <Text style={styles.h1}>Carrinho</Text>
              </View>
              <View style={styles.containerLateralHeader}></View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={Platform.OS === 'web'}
              style={styles.scrollViewDefault}>
              {cartItems.length === 0 ? (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <Text style={styles.h2}>Seu carrinho está vazio!</Text>
                </View>
              ) : (
                cartItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      selectProduct(item);
                      setProductVisible(true);
                      setCartVisible(false);
                    }}
                    style={styles.modalCarrinhoProduto}>
                    <View style={styles.modalCarrinhoProdutoFotoContainer}>
                      <Image
                        style={styles.modalCarrinhoProdutoFoto}
                        source={
                          item.fotoDoDia && item.fotoDoDia.trim() !== ''
                            ? { uri: item.fotoDoDia }
                            : {
                                uri: 'https://t3.ftcdn.net/jpg/10/34/39/40/360_F_1034394041_F0TwFmDeWtjn3XXtrNjeBB7SYYfvJz6n.jpg',
                              }
                        }
                      />
                    </View>
                    <View style={{ maxWidth: '35%' }}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.h2}>
                        {item.nome}
                      </Text>
                      <Text style={styles.h3}>
                        R${' '}
                        {(item.valor * item.quantidade)
                          .toFixed(2)
                          .replace('.', ',')}
                      </Text>
                    </View>
                    <View style={styles.modalCarrinhoAddRemoveContainer}>
                      <TouchableOpacity
                        onPress={() => removeFromCart(item.id)}
                        style={styles.quantitybutton}>
                        {item.quantidade === 1 ? (
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: 'red' }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faMinus}
                            style={{ color: 'red' }}
                          />
                        )}
                      </TouchableOpacity>
                      <Text style={styles.h3}>{item.quantidade}</Text>
                      <TouchableOpacity
                        onPress={() => addToCart(item)}
                        style={styles.quantitybutton}>
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ color: 'green' }}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
            <View style={styles.modalCarrinhoFooter}>
              <Text style={styles.h3}>
                Total: R$ {total.toFixed(2).replace('.', ',')}
              </Text>
              <TouchableOpacity
                style={styles.modalCarrinhoComprarBttn}
                onPress={() => avisocompra()}>
                <Text style={styles.addcarttext}>Comprar</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
        {/* MODAL DO SEARCH */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={searchVisible}
          onRequestClose={() => {
            setSearchVisible(!searchVisible);
          }}>
          <SafeAreaView style={styles.container}>
            <View style={styles.modalSearchHeaderContainer}>
              <View style={styles.modalSearchBar}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <TextInput
                  style={styles.input}
                  onChangeText={onSearchChange}
                  value={productSearch}
                  placeholder={'O que gostaria hoje?'}
                />
              </View>
              <View>
                {/* botão de fechar o modal */}
                <TouchableOpacity
                  style={styles.closeBttnSearch}
                  onPress={() => {
                    setSearchVisible(!searchVisible);
                    onSearchChange('');
                  }}>
                  <Text style={styles.modalSearchCancelarBttn}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={Platform.OS === 'web'}
              style={styles.scrollViewDefault}>
              <View style={styles.modalSearchHistoryContainer}>
                <TouchableOpacity
                  style={styles.modalSearchHistoryBttn}
                  onPress={() => {
                    onSearchChange(produtos[11].nome);
                  }}>
                  <FontAwesomeIcon icon={faClockRotateLeft} />
                  <Text style={styles.h3}>{produtos[11].nome}</Text>
                </TouchableOpacity>
              </View>
              {produtos
                .filter(
                  (p) =>
                    p.nome
                      .toLowerCase()
                      .includes(productSearch.toLowerCase()) ||
                    p.categoria
                      .toLowerCase()
                      .includes(productSearch.toLowerCase())
                )
                .map((produto) => (
                  <TouchableOpacity
                    key={produto.id}
                    style={styles.produto}
                    onPress={() => {
                      selectProduct(produto);
                      setProductVisible(true);
                      setSearchVisible(false);
                      onSearchChange('');
                    }}>
                    <View style={styles.modalSearchImageContainer}>
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
                    </View>
                    <View style={styles.modalSearchTextContainer}>
                      {/* Aqui é o nome do produto. */}
                      <Text
                        style={styles.h2}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {produto.nome}
                      </Text>
                      <Text
                        style={styles.h5Desc}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {produto.descricao}
                      </Text>

                      {/* Aqui é o preço do produto. */}
                      <Text style={styles.h2}>
                        R$ {produto.valor.toFixed(2).replace('.', ',')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>
        {/* MODAL DO SOBRE O APP */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={aboutVisible}
          onRequestClose={() => {
            setAboutVisible(!aboutVisible);
          }}>
          <SafeAreaView style={styles.container}>
            <View style={styles.modalHeader}>
              <View style={styles.containerLateralHeader}>
                {/* botão de fechar o modal */}
                <TouchableOpacity
                  style={styles.closeBttn}
                  onPress={() => setAboutVisible(!aboutVisible)}>
                  <FontAwesomeIcon icon={faChevronDown} />
                </TouchableOpacity>
              </View>
              <View style={styles.containerCentralHeader}>
                <Text style={styles.h1}>Sobre o APP</Text>
              </View>
              <View style={styles.containerLateralHeader}></View>
            </View>
            <View
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: '#f7f7f7',
                alignItems: 'center',
              }}>
              <Text>Teste</Text>
            </View>
          </SafeAreaView>
        </Modal>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.h1}>Mercadinho BigBom!</Text>
        </View>
        {/* Parte "Scrollavel" do app */}
        <ScrollView
          contentContainerStyle={{ width: '100%' }}
          showsVerticalScrollIndicator={Platform.OS === 'web'}
          style={styles.scroll}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            contentContainerStyle={{ height: 55, gap: 5, padding: 5 }}>
            {categorias.map((categoria) => (
              <TouchableOpacity
                style={
                  chosenCategory === categoria.nome
                    ? styles.categoriaSelecionada
                    : styles.categoriaNaoSelecionada
                }
                onPress={() => {
                  onCategoryChange(categoria.nome);
                }}>
                <Text>{categoria.nome}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={{ gap: 10 }}>
            {chosenCategory === '' ? (
              <View style={styles.produtosDoDia}>
                <Text style={styles.h1}>Produto do dia!</Text>
                <TouchableOpacity
                  style={styles.produtoDoDia}
                  onPress={() => {
                    selectProduct(produtoDoDia);
                    setProductVisible(true);
                  }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.h1}>{produtoDoDia.nome}</Text>
                    <Text style={styles.h2}>
                      R$ {produtoDoDia.valor.toFixed(2).replace('.', ',')}
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
            ) : null}
            {/* "div" focada em organizar como um todo os produtos */}
            <View style={styles.produtos}>
              {/* criação de um loop pelos produtos para exibir cada um corretamente */}
              {categorias
                .filter((c) => c.nome.includes(chosenCategory))
                .map((categoria) => (
                  <View>
                    <View
                      style={{
                        padding: 10,
                        borderTopWidth: 1,
                        borderColor: '#e6e6e6',
                        borderBottomWidth: 1,
                      }}>
                      <Text style={styles.h3}>{categoria.nome}</Text>
                    </View>
                    {produtos
                      .filter((p) => p.categoria.includes(categoria.nome))
                      .map((produto) => (
                        <TouchableOpacity
                          key={produto.id}
                          style={styles.produto}
                          onPress={() => {
                            selectProduct(produto);
                            setProductVisible(true);
                          }}>
                          <View
                            style={{
                              width: '50%',
                              height: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
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
                          </View>
                          <View
                            style={{
                              width: '50%',
                              justifyContent: 'center',
                              paddingLeft: 10,
                            }}>
                            {/* Aqui é o nome do produto. */}
                            <Text
                              numberOfLines={2}
                              ellipsizeMode="tail"
                              style={styles.h2}>
                              {produto.nome}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 10,
                                fontFamily: 'OpenSans_400Regular',
                                color: '#777',
                              }}
                              numberOfLines={2}
                              ellipsizeMode="tail">
                              {produto.descricao}
                            </Text>

                            {/* Aqui é o preço do produto. */}
                            <Text style={styles.h2}>
                              R$ {produto.valor.toFixed(2).replace('.', ',')}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                  </View>
                ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          {footer.map((i) => (
            <View key={i.id} style={styles.sectfooter}>
              <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={i.pressFunction}>
                <FontAwesomeIcon
                  icon={i.iconName}
                  size={i.iconSize}
                  style={{ color: '#15243c' }}
                />
                <Text style={styles.h4}>{i.iconText}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  /* Styles Modal da pagina do produto */
  modalProdutoBase: {
    width: '100%',
    height: 250,
  },
  modalProdutoTexto: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  modalProdutoDivAdicionar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  /* Styles Modal da pagina do produto */

  /* Styles Modal da Pagina do carrinho  */
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: '#f7f7f7',
  },
  modalCarrinhoProduto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 130,
    paddingHorizontal: 5,
  },
  modalCarrinhoProdutoFotoContainer: {
    width: '30%',
    height: '80%',
    alignItems: 'center',
  },
  modalCarrinhoProdutoFoto: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalCarrinhoAddRemoveContainer: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#f1f1f1',
  },
  modalCarrinhoFooter: {
    marginTop: 0,
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f7f7f7',
  },
  modalCarrinhoComprarBttn: {
    width: '50%',
    height: 50,
    padding: 5,
    backgroundColor: '#2081C3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Styles Modal da Pagina do carrinho  */

  /* Stles Modal da Pagina de pesquisa */
  modalSearchHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 10,
    gap: 10,
    backgroundColor: '#f7f7f7',
  },
  modalSearchBar: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    padding: 5,
    borderRadius: 20,
  },
  modalSearchCancelarBttn: {
    color: '#2081C3',
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
  },
  modalSearchHistoryContainer: {
    padding: 10,
  },
  modalSearchHistoryBttn: {
    height: 30,
    minWidth: 120,
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  modalSearchImageContainer: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSearchTextContainer: {
    width: '50%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  /* Stles Modal da Pagina de pesquisa */

  /* Parte de categorias */
  categoriaSelecionada: {
    backgroundColor: '#e6e6e6',
    height: '100%',
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 8,
  },
  categoriaNaoSelecionada: {
    backgroundColor: '#e6e6e6',
    height: '100%',
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 20,
    paddingHorizontal: 8,
  },

  //Aqui estão os "styles" da pagina
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  containerLateralHeader: {
    width: '15%',
  },
  containerCentralHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closebttncontainer: {
    width: '100%',
    paddingTop: 20,
    paddingLeft: 20,
  },
  scrollViewDefault: {
    flex: 1,
    width: '100%',
    gap: 10,
    backgroundColor: '#f7f7f7',
  },
  closeBttn: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  closeBttnSearch: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    width: '100%',
    alignItems: 'center',
  },
  header: {
    height: 70,
    backgroundColor: '#ffffff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
  },
  sectfooter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 25,
    fontFamily: 'OpenSans_400Regular',
  },
  h2: {
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
  },
  h3: {
    fontSize: 15,
    fontFamily: 'OpenSans_300Light',
  },
  h4: {
    fontSize: 11,
    fontFamily: 'OpenSans_300Light',
  },
  h5Desc: {
    fontWeight: 10,
    fontFamily: 'OpenSans_400Regular',
    color: '#777',
  },
  produtosDoDia: {
    marginTop: 10,
    gap: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  produtoDoDia: {
    alignItems: 'center',
    width: '94%',
    maxWidth: 410,
    height: 250,
    backgroundColor: '#f7f7f7',
    borderRadius: 25,
    elevation: 5, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
    flexDirection: 'column-reverse',
    paddingVertical: 5,
  },
  produtoDoDiaImg: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  produtos: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  produto: {
    flexDirection: 'row-reverse',
    height: 110,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
  },
  produtoImg: {
    height: '100%',
    width: 120,
    borderRadius: 10,
  },
  selectedproductimage: {
    flex: 1,
    height: '100%',
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  addcart: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: '#2081C3',
    borderColor: '#f9f9f9f9',
    width: '60%',
    height: 60,
  },
  addcarttext: {
    color: '#fff',
    fontSize: 15,
  },
  quantitybutton: {
    borderRadius: 5,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 40,
    padding: 5,
  },
});
