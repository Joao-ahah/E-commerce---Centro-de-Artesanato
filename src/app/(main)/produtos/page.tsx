'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ProdutosPage() {
  const searchParams = useSearchParams();
  const categoriaParam = searchParams.get('categoria');
  
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  
  // Estados para filtros
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(categoriaParam);
  const [ordenacao, setOrdenacao] = useState('recentes');
  const [faixaPreco, setFaixaPreco] = useState<number[]>([0, 1000]);
  const [busca, setBusca] = useState('');
  
  // Categorias disponíveis
  const categorias = [
    { id: 'ceramica', nome: 'Cerâmica' },
    { id: 'texteis', nome: 'Têxteis' },
    { id: 'madeira', nome: 'Madeira' },
    { id: 'trancados', nome: 'Trançados' },
    { id: 'adornos', nome: 'Adornos' },
    { id: 'decoracao', nome: 'Decoração' }
  ];

  // Efeito para carregar produtos
  useEffect(() => {
    const carregarProdutos = async () => {
      setCarregando(true);
      try {
        // Dados de exemplo, em produção conectaria com a API
        const produtosExemplo = [
          {
            id: 1,
            nome: 'Cerâmica Marajoara',
            preco: 149.90,
            descricao: 'Vaso decorativo inspirado na arte marajoara',
            imagem: 'https://images.unsplash.com/photo-1565193566173-7a0af771d71a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
            categoria: 'ceramica',
            categoriaNome: 'Cerâmica',
            emDestaque: true,
            dataAdicionado: '2023-10-15'
          },
          {
            id: 2,
            nome: 'Rede Artesanal',
            preco: 239.90,
            descricao: 'Rede tradicional nordestina em algodão natural',
            imagem: 'https://images.unsplash.com/photo-1583260146211-0ee249945ad8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
            categoria: 'texteis',
            categoriaNome: 'Têxteis',
            emDestaque: true,
            dataAdicionado: '2023-10-12'
          },
          {
            id: 3,
            nome: 'Cesto de Palha',
            preco: 89.90,
            descricao: 'Cesto de palha trançado à mão por artesãs do Vale do Ribeira',
            imagem: 'https://images.unsplash.com/photo-1635431726133-253809e9db5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
            categoria: 'trancados',
            categoriaNome: 'Trançados',
            emDestaque: true,
            dataAdicionado: '2023-10-10'
          },
          {
            id: 4,
            nome: 'Escultura em Madeira',
            preco: 299.90,
            descricao: 'Escultura feita à mão em madeira de lei reciclada',
            imagem: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
            categoria: 'madeira',
            categoriaNome: 'Madeira',
            emDestaque: true,
            dataAdicionado: '2023-10-05'
          },
          {
            id: 5,
            nome: 'Bordado Nordestino',
            preco: 199.90,
            descricao: 'Kit com almofadas bordadas à mão por artesãs pernambucanas',
            imagem: 'https://images.unsplash.com/photo-1576096616585-f336dfa910ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
            categoria: 'texteis',
            categoriaNome: 'Têxteis',
            emDestaque: true,
            dataAdicionado: '2023-09-28'
          },
          {
            id: 6,
            nome: 'Colares Indígenas',
            preco: 79.90,
            descricao: 'Colar de sementes naturais da Amazônia, feito por comunidades indígenas',
            imagem: 'https://images.unsplash.com/photo-1644306014741-3dfef1d3bbcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
            categoria: 'adornos',
            categoriaNome: 'Adornos',
            emDestaque: true,
            dataAdicionado: '2023-09-20'
          },
          {
            id: 7,
            nome: 'Bonecos de Barro',
            preco: 129.90,
            descricao: 'Conjunto de bonecos decorativos de barro, inspirados no Mestre Vitalino',
            imagem: 'https://images.unsplash.com/photo-1594971077507-4b9f6b2832b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
            categoria: 'ceramica',
            categoriaNome: 'Cerâmica',
            emDestaque: false,
            dataAdicionado: '2023-09-15'
          },
          {
            id: 8,
            nome: 'Centro de Mesa em Macramê',
            preco: 159.90,
            descricao: 'Centro de mesa trançado à mão em macramê com fios naturais',
            imagem: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
            categoria: 'decoracao',
            categoriaNome: 'Decoração',
            emDestaque: false,
            dataAdicionado: '2023-09-10'
          },
          {
            id: 9,
            nome: 'Escultura em Capim Dourado',
            preco: 289.90,
            descricao: 'Escultura decorativa feita de capim dourado do Jalapão',
            imagem: 'https://images.unsplash.com/photo-1471666875520-c75081f42081?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
            categoria: 'decoracao',
            categoriaNome: 'Decoração',
            emDestaque: false,
            dataAdicionado: '2023-09-05'
          },
          {
            id: 10,
            nome: 'Tábua de Madeira Rústica',
            preco: 119.90,
            descricao: 'Tábua para servir alimentos feita de madeira de demolição',
            imagem: 'https://images.unsplash.com/photo-1584589012423-471357901089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            categoria: 'madeira',
            categoriaNome: 'Madeira',
            emDestaque: false,
            dataAdicionado: '2023-09-01'
          },
          {
            id: 11,
            nome: 'Brincos de Sementes',
            preco: 49.90,
            descricao: 'Brincos artesanais feitos com sementes naturais da Floresta Amazônica',
            imagem: 'https://images.unsplash.com/photo-1583316250284-20e801932d5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            categoria: 'adornos',
            categoriaNome: 'Adornos',
            emDestaque: false,
            dataAdicionado: '2023-08-25'
          },
          {
            id: 12,
            nome: 'Manta de Lã Natural',
            preco: 259.90,
            descricao: 'Manta artesanal tecida em tear manual com lã de ovelha natural',
            imagem: 'https://images.unsplash.com/photo-1612363148951-15f16817648f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
            categoria: 'texteis',
            categoriaNome: 'Têxteis',
            emDestaque: false,
            dataAdicionado: '2023-08-20'
          }
        ];

        setProdutos(produtosExemplo);
        setProdutosFiltrados(produtosExemplo);
      } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
        toast.error('Não foi possível carregar os produtos');
      } finally {
        setCarregando(false);
      }
    };

    carregarProdutos();
  }, []);

  // Efeito para aplicar filtros
  useEffect(() => {
    let resultado = [...produtos];

    // Filtrar por categoria
    if (categoriaSelecionada) {
      resultado = resultado.filter(produto => produto.categoria === categoriaSelecionada);
    }

    // Filtrar por busca
    if (busca) {
      const termoBusca = busca.toLowerCase();
      resultado = resultado.filter(produto => 
        produto.nome.toLowerCase().includes(termoBusca) || 
        produto.descricao.toLowerCase().includes(termoBusca)
      );
    }

    // Filtrar por faixa de preço
    resultado = resultado.filter(produto => 
      produto.preco >= faixaPreco[0] && produto.preco <= faixaPreco[1]
    );

    // Aplicar ordenação
    switch (ordenacao) {
      case 'preco-menor':
        resultado.sort((a, b) => a.preco - b.preco);
        break;
      case 'preco-maior':
        resultado.sort((a, b) => b.preco - a.preco);
        break;
      case 'nome-asc':
        resultado.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'nome-desc':
        resultado.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      case 'recentes':
      default:
        resultado.sort((a, b) => new Date(b.dataAdicionado).getTime() - new Date(a.dataAdicionado).getTime());
        break;
    }

    setProdutosFiltrados(resultado);
  }, [produtos, categoriaSelecionada, busca, faixaPreco, ordenacao]);

  // Função para limpar todos os filtros
  const limparFiltros = () => {
    setCategoriaSelecionada(null);
    setOrdenacao('recentes');
    setFaixaPreco([0, 1000]);
    setBusca('');
  };

  // Função para formatar preço
  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(preco);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da página */}
      <div className="bg-amber-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Produtos Artesanais</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Descubra peças únicas feitas à mão por artesãos de todo o Brasil, 
            carregadas de tradição, história e cultura.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Barra de pesquisa e contagem */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <svg 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">
              {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto' : 'produtos'} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
            </span>
            {(categoriaSelecionada || busca || faixaPreco[0] > 0 || faixaPreco[1] < 1000 || ordenacao !== 'recentes') && (
              <button 
                onClick={limparFiltros}
                className="ml-2 text-amber-600 hover:text-amber-800 font-medium text-sm flex items-center"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Limpar filtros
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar com filtros */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Categorias</h2>
              <div className="space-y-2">
                {categorias.map((categoria) => (
                  <div key={categoria.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`cat-${categoria.id}`}
                      checked={categoriaSelecionada === categoria.id}
                      onChange={() => {
                        setCategoriaSelecionada(
                          categoriaSelecionada === categoria.id ? null : categoria.id
                        );
                      }}
                      className="mr-2 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`cat-${categoria.id}`} className="text-gray-700 cursor-pointer">
                      {categoria.nome}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Faixa de Preço</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>{formatarPreco(faixaPreco[0])}</span>
                  <span>{formatarPreco(faixaPreco[1])}</span>
                </div>
                <div className="flex space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={faixaPreco[0]}
                    onChange={(e) => setFaixaPreco([parseInt(e.target.value), faixaPreco[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={faixaPreco[1]}
                    onChange={(e) => setFaixaPreco([faixaPreco[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ordenar por</h2>
              <select
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="recentes">Mais recentes</option>
                <option value="preco-menor">Menor preço</option>
                <option value="preco-maior">Maior preço</option>
                <option value="nome-asc">Nome (A-Z)</option>
                <option value="nome-desc">Nome (Z-A)</option>
              </select>
            </div>
          </div>
          
          {/* Listagem de produtos */}
          <div className="lg:w-3/4">
            {carregando ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
              </div>
            ) : produtosFiltrados.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <svg className="h-16 w-16 text-amber-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-4">
                  Não encontramos produtos que correspondam aos seus filtros.
                </p>
                <button 
                  onClick={limparFiltros}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {produtosFiltrados.map((produto) => (
                  <Link 
                    key={produto.id} 
                    href={`/produtos/${produto.id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                        <div 
                          className="absolute inset-0 transform duration-500 ease-in-out group-hover:scale-110" 
                          style={{
                            backgroundImage: `url(${produto.imagem})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">{produto.nome}</h3>
                          <p className="text-gray-600 text-sm mb-4">{produto.descricao}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-amber-700 font-bold">
                            {formatarPreco(produto.preco)}
                          </span>
                          <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                            {produto.categoriaNome}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 