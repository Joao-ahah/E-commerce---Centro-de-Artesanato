import Link from 'next/link';
import Image from 'next/image';

export default function BlogPage() {
  // Dados de exemplo para posts do blog
  const blogPosts = [
    {
      id: '1',
      titulo: 'Feira de Artesanato - Edição de Primavera',
      slug: 'feira-artesanato-primavera',
      resumo: 'Nossa feira sazonal traz novos artesãos e produtos exclusivos para celebrar a chegada da primavera.',
      conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      imagem: 'https://images.unsplash.com/photo-1617306855675-902393235764?w=800&h=500&fit=crop',
      data: '2023-09-15',
      autor: 'Maria Silva',
      categorias: ['Eventos', 'Feira']
    },
    {
      id: '2',
      titulo: 'Workshop: Técnicas de Cerâmica Tradicional',
      slug: 'workshop-ceramica-tradicional',
      resumo: 'Aprenda técnicas ancestrais de cerâmica com a artesã Ana Pereira em nosso workshop mensal.',
      conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      imagem: 'https://images.unsplash.com/photo-1604236349784-126db77a7339?w=800&h=500&fit=crop',
      data: '2023-08-28',
      autor: 'Carlos Mendes',
      categorias: ['Workshop', 'Cerâmica']
    },
    {
      id: '3',
      titulo: 'Novos Artesãos Selecionados para o Programa de Mentoria',
      slug: 'artesaos-programa-mentoria',
      resumo: 'Conheça os 10 artesãos selecionados para nosso programa anual de mentoria e desenvolvimento profissional.',
      conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      imagem: 'https://images.unsplash.com/photo-1605883705077-8d3d73afef57?w=800&h=500&fit=crop',
      data: '2023-08-15',
      autor: 'Juliana Costa',
      categorias: ['Notícias', 'Mentoria']
    },
    {
      id: '4',
      titulo: 'Lançamento da Coleção "Raízes Brasileiras"',
      slug: 'lancamento-colecao-raizes-brasileiras',
      resumo: 'Nossa nova coleção celebra a diversidade cultural brasileira com peças que resgatam técnicas tradicionais.',
      conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      imagem: 'https://images.unsplash.com/photo-1605971435268-d9d1f47d45e6?w=800&h=500&fit=crop',
      data: '2023-08-05',
      autor: 'Roberto Alves',
      categorias: ['Coleções', 'Lançamento']
    },
    {
      id: '5',
      titulo: 'Parceria com Comunidades Quilombolas para Produção Têxtil',
      slug: 'parceria-comunidades-quilombolas',
      resumo: 'Iniciamos um projeto colaborativo com comunidades quilombolas para desenvolver uma linha exclusiva de produtos têxteis.',
      conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      imagem: 'https://images.unsplash.com/photo-1588187284031-3fcc97a9ccc9?w=800&h=500&fit=crop',
      data: '2023-07-20',
      autor: 'Fernanda Santos',
      categorias: ['Projetos', 'Comunidades']
    },
    {
      id: '6',
      titulo: 'Exposição "Mãos que Criam" na Galeria Central',
      slug: 'exposicao-maos-que-criam',
      resumo: 'Visite nossa exposição fotográfica que documenta o processo criativo de artesãos de todo o Brasil.',
      conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      imagem: 'https://images.unsplash.com/photo-1614113035936-751e3b79e955?w=800&h=500&fit=crop',
      data: '2023-07-10',
      autor: 'Marcelo Rocha',
      categorias: ['Exposição', 'Fotografia']
    }
  ];
  
  // Todas as categorias únicas
  const todasCategorias = [...new Set(blogPosts.flatMap(post => post.categorias))];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header do blog */}
      <div className="bg-amber-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog do Centro de Artesanato</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Notícias, eventos, histórias de artesãos e muito mais sobre o mundo do artesanato brasileiro
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="lg:flex lg:gap-12">
          {/* Posts do Blog */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Publicações Recentes</h2>
            
            {/* Lista de posts */}
            <div className="space-y-10">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-64">
                      <img
                        src={post.imagem}
                        alt={post.titulo}
                        className="h-48 w-full object-cover md:h-full"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categorias.map((categoria) => (
                          <span key={categoria} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                            {categoria}
                          </span>
                        ))}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-amber-700 transition-colors">
                          {post.titulo}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4">{post.resumo}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{post.autor}</span>
                        <span className="mx-2">•</span>
                        <time dateTime={post.data}>
                          {new Date(post.data).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                      <div className="mt-4">
                        <Link href={`/blog/${post.slug}`} className="text-amber-600 hover:text-amber-800 font-medium">
                          Ler artigo completo →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {/* Paginação */}
            <div className="mt-10 flex justify-center">
              <nav className="flex items-center space-x-2">
                <a href="#" className="px-4 py-2 text-gray-500 bg-white rounded-md border">
                  Anterior
                </a>
                <a href="#" className="px-4 py-2 text-white bg-amber-600 rounded-md">
                  1
                </a>
                <a href="#" className="px-4 py-2 text-gray-700 bg-white rounded-md border">
                  2
                </a>
                <a href="#" className="px-4 py-2 text-gray-700 bg-white rounded-md border">
                  3
                </a>
                <a href="#" className="px-4 py-2 text-gray-500 bg-white rounded-md border">
                  Próxima
                </a>
              </nav>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 mt-10 lg:mt-0">
            {/* Busca */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">Buscar no Blog</h3>
              <form className="flex">
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  className="px-4 py-2 border border-gray-300 rounded-l-md flex-1 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  Buscar
                </button>
              </form>
            </div>
            
            {/* Categorias */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">Categorias</h3>
              <ul className="space-y-2">
                {todasCategorias.map((categoria) => (
                  <li key={categoria}>
                    <Link href={`/blog/categoria/${categoria.toLowerCase()}`} className="text-gray-700 hover:text-amber-600 transition-colors flex items-center">
                      <span className="mr-2">•</span>
                      {categoria}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Inscrição Newsletter */}
            <div className="bg-amber-50 p-6 rounded-lg shadow-md mb-6 border border-amber-100">
              <h3 className="text-lg font-semibold mb-2">Receba Nossas Novidades</h3>
              <p className="text-gray-600 mb-4">
                Inscreva-se para receber as últimas notícias, eventos e conteúdo exclusivo.
              </p>
              <form>
                <input
                  type="email"
                  placeholder="Seu email"
                  className="px-4 py-2 border border-gray-300 rounded-md w-full mb-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Inscrever-se
                </button>
              </form>
            </div>
            
            {/* Eventos Próximos */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Próximos Eventos</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-medium">Feira de Primavera</h4>
                  <p className="text-sm text-gray-600">15 de Setembro, 2023</p>
                  <p className="text-sm text-gray-600">Centro Cultural São Paulo</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-medium">Workshop de Macramê</h4>
                  <p className="text-sm text-gray-600">28 de Setembro, 2023</p>
                  <p className="text-sm text-gray-600">Sala de Oficinas - 2º andar</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-medium">Exposição "Mãos que Criam"</h4>
                  <p className="text-sm text-gray-600">10-30 de Outubro, 2023</p>
                  <p className="text-sm text-gray-600">Galeria Central</p>
                </div>
              </div>
              <div className="mt-4">
                <a href="/eventos" className="text-amber-600 hover:text-amber-800 font-medium">
                  Ver todos os eventos →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 