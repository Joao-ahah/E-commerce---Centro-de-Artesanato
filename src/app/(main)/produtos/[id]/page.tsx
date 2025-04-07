'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useCart } from '@/providers/CartProvider';

export default function ProdutoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const { addItem } = useCart();

  const [produto, setProduto] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionandoAoCarrinho, setAdicionandoAoCarrinho] = useState(false);

  // Produtos relacionados
  const [produtosRelacionados, setProdutosRelacionados] = useState<any[]>([]);

  useEffect(() => {
    const carregarProduto = async () => {
      setCarregando(true);
      try {
        // Em uma aplicação real, faria uma chamada API
        // Dados simulados
        const produtosExemplo = [
          {
            id: '1',
            nome: 'Cerâmica Marajoara',
            preco: 149.90,
            descricao: 'Vaso decorativo inspirado na arte marajoara, produzido por artesãos da região do Marajó, no Pará. Cada peça carrega a tradição ancestral desta arte que remonta a mais de 1000 anos.',
            imagens: [
              'https://images.unsplash.com/photo-1565193566173-7a0af771d71a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
              'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
              'https://images.unsplash.com/photo-1577979749830-f1d742b96791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
            ],
            categoria: 'ceramica',
            categoriaNome: 'Cerâmica',
            emEstoque: 15,
            artesao: 'Maria da Silva',
            origem: 'Ilha de Marajó, Pará',
            dimensoes: '25cm x 15cm',
            peso: '1.2kg',
            materiais: ['Argila', 'Tinta natural', 'Verniz']
          },
          {
            id: '2',
            nome: 'Rede Artesanal',
            preco: 239.90,
            descricao: 'Rede tradicional nordestina em algodão natural, tecida à mão por artesãs do interior do Ceará. Ideal para relaxar e trazer um toque de regionalismo ao seu espaço.',
            imagens: [
              'https://images.unsplash.com/photo-1583260146211-0ee249945ad8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
              'https://images.unsplash.com/photo-1617713964959-d9a36bbc7b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
            ],
            categoria: 'texteis',
            categoriaNome: 'Têxteis',
            emEstoque: 8,
            artesao: 'Associação de Artesãs do Sertão',
            origem: 'Quixadá, Ceará',
            dimensoes: '2.2m x 1.4m',
            peso: '0.9kg',
            materiais: ['Algodão natural', 'Corantes naturais']
          },
          {
            id: '3',
            nome: 'Cesto de Palha',
            preco: 89.90,
            descricao: 'Cesto de palha trançado à mão por artesãs do Vale do Ribeira, utilizando técnicas tradicionais passadas de geração em geração. Perfeito para organização e decoração.',
            imagens: [
              'https://images.unsplash.com/photo-1635431726133-253809e9db5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
              'https://images.unsplash.com/photo-1632121541471-92a8e6336fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
            ],
            categoria: 'trancados',
            categoriaNome: 'Trançados',
            emEstoque: 22,
            artesao: 'Comunidade Quilombola do Vale do Ribeira',
            origem: 'Vale do Ribeira, São Paulo',
            dimensoes: '30cm x 25cm x 20cm',
            peso: '0.5kg',
            materiais: ['Palha de bananeira', 'Fibras naturais']
          },
          {
            id: '4',
            nome: 'Escultura em Madeira',
            preco: 299.90,
            descricao: 'Escultura feita à mão em madeira de lei reciclada por artesãos do interior de Minas Gerais. Cada peça é única, com entalhes que destacam a beleza natural da madeira.',
            imagens: [
              'https://images.unsplash.com/photo-1635363638580-c2809d049eee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
              'https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
            ],
            categoria: 'madeira',
            categoriaNome: 'Madeira',
            emEstoque: 5,
            artesao: 'João de Barro Ateliê',
            origem: 'São João del-Rei, Minas Gerais',
            dimensoes: '40cm x 15cm x 12cm',
            peso: '2.3kg',
            materiais: ['Madeira de demolição', 'Cera natural', 'Verniz']
          }
        ];

        const produtoEncontrado = produtosExemplo.find(p => p.id === id);
        
        if (!produtoEncontrado) {
          router.push('/produtos');
          toast.error('Produto não encontrado.');
          return;
        }
        
        setProduto(produtoEncontrado);
        
        // Simular produtos relacionados - em produção, buscaria da API
        const relacionados = produtosExemplo
          .filter(p => p.id !== id && p.categoria === produtoEncontrado.categoria)
          .slice(0, 3);
          
        setProdutosRelacionados(relacionados);
      } catch (erro) {
        console.error('Erro ao carregar produto:', erro);
        toast.error('Não foi possível carregar o produto.');
        router.push('/produtos');
      } finally {
        setCarregando(false);
      }
    };

    if (id) {
      carregarProduto();
    }
  }, [id, router]);

  const handleAdicionarAoCarrinho = async () => {
    setAdicionandoAoCarrinho(true);
    
    try {
      // Simulação de delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Adicionar ao carrinho usando o contexto
      addItem({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: quantidade,
        imagem: produto.imagens[0],
        artesao: produto.artesao
      });
      
      toast.success(`${quantidade} unidade(s) de ${produto.nome} adicionado ao carrinho!`);
    } catch (erro) {
      console.error('Erro ao adicionar ao carrinho:', erro);
      toast.error('Ocorreu um erro ao adicionar o produto ao carrinho.');
    } finally {
      setAdicionandoAoCarrinho(false);
    }
  };

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(preco);
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!produto) {
    return null; // Redirecionando via router, então esse estado é momentâneo
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Navegação de migalhas de pão */}
        <div className="mb-8">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-amber-600">
              Início
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/produtos" className="text-gray-500 hover:text-amber-600">
              Produtos
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/produtos?categoria=${produto.categoria}`} className="text-gray-500 hover:text-amber-600">
              {produto.categoriaNome}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{produto.nome}</span>
          </nav>
        </div>
        
        {/* Informações do produto */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Galeria de imagens */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-80 sm:h-96 md:h-[500px] rounded-lg overflow-hidden mb-4">
                <div 
                  className="absolute inset-0 transition-transform duration-500 ease-in-out"
                  style={{
                    backgroundImage: `url(${produto.imagens[imagemAtiva]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
              
              {produto.imagens.length > 1 && (
                <div className="flex space-x-2 justify-center">
                  {produto.imagens.map((imagem: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setImagemAtiva(index)}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        index === imagemAtiva 
                          ? 'border-amber-600 opacity-100 scale-105' 
                          : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${imagem})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Informações e compra */}
            <div className="md:w-1/2 p-6 md:border-l border-gray-200">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{produto.nome}</h1>
              
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-amber-600 mr-4">
                  {formatarPreco(produto.preco)}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  produto.emEstoque > 10 
                    ? 'bg-green-100 text-green-800' 
                    : produto.emEstoque > 0 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  {produto.emEstoque > 10 
                    ? 'Em estoque' 
                    : produto.emEstoque > 0 
                      ? `Apenas ${produto.emEstoque} ${produto.emEstoque === 1 ? 'unidade' : 'unidades'}`
                      : 'Esgotado'
                  }
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-4">{produto.descricao}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Artesão:</span>
                    <span className="text-gray-800 font-medium">{produto.artesao}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Origem:</span>
                    <span className="text-gray-800 font-medium">{produto.origem}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Dimensões:</span>
                    <span className="text-gray-800 font-medium">{produto.dimensoes}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Peso:</span>
                    <span className="text-gray-800 font-medium">{produto.peso}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="text-gray-500 text-sm">Materiais:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {produto.materiais.map((material: string, index: number) => (
                      <span 
                        key={index}
                        className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center mb-6">
                  <span className="text-gray-700 mr-4">Quantidade:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                      className="px-3 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      disabled={quantidade <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-x border-gray-300">{quantidade}</span>
                    <button 
                      onClick={() => setQuantidade(Math.min(produto.emEstoque, quantidade + 1))}
                      className="px-3 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      disabled={quantidade >= produto.emEstoque}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleAdicionarAoCarrinho}
                    disabled={adicionandoAoCarrinho || produto.emEstoque === 0}
                    className={`flex-1 py-3 px-6 rounded-md font-medium ${
                      produto.emEstoque === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-amber-600 text-white hover:bg-amber-700 transition-colors'
                    }`}
                  >
                    {adicionandoAoCarrinho ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Adicionando...
                      </span>
                    ) : produto.emEstoque === 0 ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
                  </button>
                  
                  <button className="p-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Produtos relacionados */}
        {produtosRelacionados.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Produtos Relacionados</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtosRelacionados.map((relacionado) => (
                <Link 
                  key={relacionado.id} 
                  href={`/produtos/${relacionado.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <div 
                        className="absolute inset-0 transform duration-500 ease-in-out group-hover:scale-110" 
                        style={{
                          backgroundImage: `url(${relacionado.imagens[0]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">{relacionado.nome}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-700 font-bold">
                          {formatarPreco(relacionado.preco)}
                        </span>
                        <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                          {relacionado.categoriaNome}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 