import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Interface para o tipo de comentário
interface Comment {
  id: string;
  content: string;
}

const CommentBox: React.FC<{ id: string }> = ({ id }) => {
    const [comments, setComments] = useState<Comment[]>([]); // Estado para armazenar os comentários
  const [newComment, setNewComment] = useState(''); // Estado para armazenar o novo comentário



  // Chamada para buscar os comentários quando o componente for montado
  const fetchComments = async (id: string) => {
    try {
      const response = await fetch('http://cronos-api.onrender.com/comment/' + id, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setComments(data);
      } else {
        console.error('Erro ao buscar os comentários:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar os comentários:', error);
    }
  };

  // Chamada para buscar os comentários quando o componente for montado
  useEffect(() => {
    fetchComments("5913c061-800b-416f-971e-3994b948d093"); // Invoca a função fetchComments com o ID desejado
  }, [Comment]);

  // Função para adicionar um novo comentário
  const addComment = async () => {
    if (newComment) {
      const comment: Comment = {
        id: "5913c061-800b-416f-971e-3994b948d093",
        content: newComment,
      };
      try {
        await axios.post('https://cronos-api.onrender.com/comment', comment);
        setComments([...comments, comment]);
        setNewComment('');
      } catch (error) {
        console.error('Erro ao adicionar o comentário:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Comentários</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow rounded-l-md px-4 py-2 border border-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
          <button
            onClick={addComment}
            className="bg-purple-500 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none hover:bg-purple-600 transition duration-200"
          >
            Adicionar Comentário
          </button>
        </div>
        <ul className="text-gray-600">
          {comments.filter(comments => comments.content !== null).map((comment) => (
            <li key={comment.id} className="border-t border-gray-300 pt-4 mt-4">
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CommentBox;
