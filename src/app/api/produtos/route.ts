import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ProdutoModel } from '@/models/produto';


export const produtosSimulados = [
  // Seus dados simulados aqui
  // ...
];


// Função para simular tempo de resposta do servidor (opcional)
const simularTempo = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Produtos simulados para desenvolvimento (quando sem banco de dados)
const PRODUTOS_SIMULADOS = [
  {
    id: '1',
    nome: 'Vaso de Cerâmica Artesanal',
    descricao: 'Vaso feito à mão com técnicas tradicionais de cerâmica.',
    preco: 120.00,
    precoPromocional: 90.00,
    categoria: 'Cerâmica',
    quantidade: 15,
    destaque: true,
    imagens: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1604236349784-126db77a7339?w=800&h=600&fit=crop'
    ],
    dataCriacao: new Date().toISOString()
  },
  {
    id: '2',
    nome: 'Bolsa de Macramê',
    descricao: 'Bolsa artesanal feita com técnica de macramê e fios de algodão natural.',
    preco: 85.00,
    categoria: 'Têxtil',
    quantidade: 8,
    destaque: true,
    imagens: [
      'https://images.unsplash.com/photo-1588187284031-3fcc97a9ccc9?w=800&h=600&fit=crop'
    ],
    dataCriacao: new Date().toISOString()
  },
  {
    id: '3',
    nome: 'Conjunto de Tábuas de Madeira',
    descricao: 'Conjunto com 3 tábuas de corte feitas em madeira de reflorestamento.',
    preco: 150.00,
    precoPromocional: 120.00,
    categoria: 'Madeira',
    quantidade: 5,
    destaque: false,
    imagens: [
      'https://images.unsplash.com/photo-1605971435268-d9d1f47d45e6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613248474368-1f2578e899db?w=800&h=600&fit=crop'
    ],
    dataCriacao: new Date().toISOString()
  }
];

// GET - Obter todos os produtos ou produto específico por ID
export async function GET(req: NextRequest) {
  try {
    // Extrair parâmetros da query
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const categoria = searchParams.get('categoria');
    const destaque = searchParams.get('destaque');
    const limite = parseInt(searchParams.get('limite') || '10');
    const pagina = parseInt(searchParams.get('pagina') || '1');
    
    // Tentar conectar ao banco de dados
    let produtos;
    try {
      await dbConnect();
      
      // Construir a query
      let query: any = {};
      
      // Filtrar por ID específico
      if (id) {
        query._id = id;
        const produto = await ProdutoModel.findById(id);
        
        if (!produto) {
          return NextResponse.json({
            success: false,
            message: 'Produto não encontrado'
          }, { status: 404 });
        }
        
        return NextResponse.json({
          success: true,
          produto
        });
      }
      
      // Filtrar por categoria
      if (categoria) {
        query.categoria = categoria;
      }
      
      // Filtrar por produtos em destaque
      if (destaque === 'true') {
        query.destaque = true;
      }
      
      // Calcular paginação
      const skip = (pagina - 1) * limite;
      
      // Executar a consulta
      produtos = await ProdutoModel.find(query)
        .sort({ dataCriacao: -1 })
        .skip(skip)
        .limit(limite);
      
      // Contar total para paginação
      const total = await ProdutoModel.countDocuments(query);
      
      // Retornar produtos e informações de paginação
      return NextResponse.json({
        success: true,
        produtos,
        paginacao: {
          total,
          pagina,
          limite,
          paginas: Math.ceil(total / limite)
        }
      });
      
    } catch (dbError) {
      console.warn('Falha ao conectar ao banco de dados. Usando dados simulados.');
      console.error(dbError);
      
      // Simular resposta com dados de teste
      await simularTempo();
      
      // Filtrar produtos simulados se necessário
      let produtosFiltrados = [...PRODUTOS_SIMULADOS];
      
      if (id) {
        const produtoEncontrado = produtosFiltrados.find(p => p.id === id);
        
        if (!produtoEncontrado) {
          return NextResponse.json({
            success: false,
            message: 'Produto não encontrado'
          }, { status: 404 });
        }
        
        return NextResponse.json({
          success: true,
          produto: produtoEncontrado
        });
      }
      
      if (categoria) {
        produtosFiltrados = produtosFiltrados.filter(p => 
          p.categoria.toLowerCase() === categoria.toLowerCase()
        );
      }
      
      if (destaque === 'true') {
        produtosFiltrados = produtosFiltrados.filter(p => p.destaque);
      }
      
      // Aplicar paginação
      const total = produtosFiltrados.length;
      const inicio = (pagina - 1) * limite;
      const fim = inicio + limite;
      const produtosPaginados = produtosFiltrados.slice(inicio, fim);
      
      return NextResponse.json({
        success: true,
        produtos: produtosPaginados,
        paginacao: {
          total,
          pagina,
          limite,
          paginas: Math.ceil(total / limite)
        }
      });
    }
    
  } catch (error: any) {
    console.error('Erro ao processar requisição GET para produtos:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar produtos',
      error: error.message
    }, { status: 500 });
  }
}

// POST - Criar novo produto
export async function POST(req: NextRequest) {
  try {
    // Obter dados da requisição
    const body = await req.json();
    
    // Validar dados básicos
    if (!body.nome || !body.descricao || !body.preco || !body.categoria) {
      return NextResponse.json({
        success: false,
        message: 'Dados incompletos. Nome, descrição, preço e categoria são obrigatórios.'
      }, { status: 400 });
    }
    
    // Validar que há pelo menos uma imagem
    if (!body.imagens || !Array.isArray(body.imagens) || body.imagens.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'É necessário incluir pelo menos uma imagem para o produto.'
      }, { status: 400 });
    }
    
    try {
      // Conectar ao banco de dados
      await dbConnect();
      
      // Criar novo produto
      const novoProduto = new ProdutoModel({
        nome: body.nome,
        descricao: body.descricao,
        preco: body.preco,
        precoPromocional: body.precoPromocional,
        categoria: body.categoria,
        subcategoria: body.subcategoria,
        quantidade: body.quantidade || 0,
        destaque: body.destaque || false,
        disponivel: body.disponivel !== false, // true por padrão
        imagens: body.imagens,
        artesao: body.artesao,
        tecnica: body.tecnica,
        material: body.material,
        dimensoes: body.dimensoes,
        tags: body.tags ? (typeof body.tags === 'string' ? body.tags.split(',').map((tag: string) => tag.trim()) : body.tags) : [],
        dataCriacao: new Date()
      });
      
      // Salvar no banco de dados
      const produtoSalvo = await novoProduto.save();
      
      return NextResponse.json({
        success: true,
        message: 'Produto criado com sucesso',
        produto: produtoSalvo
      }, { status: 201 });
      
    } catch (dbError: any) {
      console.warn('Falha ao salvar no banco de dados. Simulando criação de produto.');
      console.error(dbError);
      
      // Simular criação de produto para desenvolvimento
      await simularTempo(1000);
      
      // Gerar ID aleatório
      const novoId = Math.floor(Math.random() * 1000000).toString();
      
      // Criar produto simulado
      const novoProduto = {
        id: novoId,
        ...body,
        // Garantir que valores numéricos sejam convertidos corretamente
        preco: parseFloat(body.preco),
        precoPromocional: body.precoPromocional ? parseFloat(body.precoPromocional) : undefined,
        quantidade: parseInt(body.quantidade || '0'),
        destaque: !!body.destaque,
        dataCriacao: new Date().toISOString()
      };
      
      // Adicionar o produto à lista de produtos simulados
      PRODUTOS_SIMULADOS.unshift(novoProduto);
      
      return NextResponse.json({
        success: true,
        message: 'Produto criado com sucesso (simulado)',
        produto: novoProduto
      }, { status: 201 });
    }
    
  } catch (error: any) {
    console.error('Erro ao processar requisição POST para produtos:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao criar produto',
      error: error.message
    }, { status: 500 });
  }
}

// PUT - Atualizar produto existente
export async function PUT(req: NextRequest) {
  try {
    // Extrair ID da query
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'ID do produto não fornecido'
      }, { status: 400 });
    }
    
    // Obter dados da requisição
    const body = await req.json();
    
    try {
      // Conectar ao banco de dados
      await dbConnect();
      
      // Buscar e atualizar produto
      const produtoAtualizado = await ProdutoModel.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
      );
      
      if (!produtoAtualizado) {
        return NextResponse.json({
          success: false,
          message: 'Produto não encontrado'
        }, { status: 404 });
      }
      
      return NextResponse.json({
        success: true,
        message: 'Produto atualizado com sucesso',
        produto: produtoAtualizado
      });
      
    } catch (dbError) {
      console.warn('Falha ao conectar ao banco de dados. Simulando atualização.');
      console.error(dbError);
      
      // Simular atualização para desenvolvimento
      await simularTempo();
      
      // Encontrar produto na lista simulada
      const index = PRODUTOS_SIMULADOS.findIndex(p => p.id === id);
      
      if (index === -1) {
        return NextResponse.json({
          success: false,
          message: 'Produto não encontrado'
        }, { status: 404 });
      }
      
      // Atualizar produto
      PRODUTOS_SIMULADOS[index] = {
        ...PRODUTOS_SIMULADOS[index],
        ...body,
        // Garantir que valores numéricos sejam convertidos corretamente
        preco: body.preco !== undefined ? parseFloat(body.preco) : PRODUTOS_SIMULADOS[index].preco,
        precoPromocional: body.precoPromocional !== undefined ? parseFloat(body.precoPromocional) : PRODUTOS_SIMULADOS[index].precoPromocional,
        quantidade: body.quantidade !== undefined ? parseInt(body.quantidade) : PRODUTOS_SIMULADOS[index].quantidade,
        destaque: body.destaque !== undefined ? !!body.destaque : PRODUTOS_SIMULADOS[index].destaque
      };
      
      return NextResponse.json({
        success: true,
        message: 'Produto atualizado com sucesso (simulado)',
        produto: PRODUTOS_SIMULADOS[index]
      });
    }
    
  } catch (error: any) {
    console.error('Erro ao processar requisição PUT para produtos:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao atualizar produto',
      error: error.message
    }, { status: 500 });
  }
}

// DELETE - Remover produto
export async function DELETE(req: NextRequest) {
  try {
    // Extrair ID da query
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'ID do produto não fornecido'
      }, { status: 400 });
    }
    
    try {
      // Conectar ao banco de dados
      await dbConnect();
      
      // Buscar e remover produto
      const produtoRemovido = await ProdutoModel.findByIdAndDelete(id);
      
      if (!produtoRemovido) {
        return NextResponse.json({
          success: false,
          message: 'Produto não encontrado'
        }, { status: 404 });
      }
      
      return NextResponse.json({
        success: true,
        message: 'Produto removido com sucesso'
      });
      
    } catch (dbError) {
      console.warn('Falha ao conectar ao banco de dados. Simulando remoção.');
      console.error(dbError);
      
      // Simular remoção para desenvolvimento
      await simularTempo();
      
      // Encontrar produto na lista simulada
      const index = PRODUTOS_SIMULADOS.findIndex(p => p.id === id);
      
      if (index === -1) {
        return NextResponse.json({
          success: false,
          message: 'Produto não encontrado'
        }, { status: 404 });
      }
      
      // Remover produto
      PRODUTOS_SIMULADOS.splice(index, 1);
      
      return NextResponse.json({
        success: true,
        message: 'Produto removido com sucesso (simulado)'
      });
    }
    
  } catch (error: any) {
    console.error('Erro ao processar requisição DELETE para produtos:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao remover produto',
      error: error.message
    }, { status: 500 });
  }
} 