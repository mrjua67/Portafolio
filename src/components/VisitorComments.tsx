import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { MessageSquare, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Comment {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
  email: string;
}

export function VisitorComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [nickname, setNickname] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerNickname, setRegisterNickname] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    // Track visit
    const trackVisit = async () => {
      try {
        await supabase.from('visitors').insert([{}]);
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    // Get visitor count
    const getVisitorCount = async () => {
      try {
        const { count, error } = await supabase
          .from('visitors')
          .select('*', { count: 'exact' });
        
        if (error) throw error;
        setVisitorCount(count || 0);
      } catch (error) {
        console.error('Error getting visitor count:', error);
      }
    };

    // Load comments
    const loadComments = async () => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setComments(data || []);
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };

    // Check auth state
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setUser(session?.user || null);
        setLoading(false);

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Error checking auth:', error);
        setLoading(false);
      }
    };

    trackVisit();
    getVisitorCount();
    loadComments();
    checkAuth();

    // Subscribe to comments
    const subscription = supabase
      .channel('comments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, loadComments)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      if (isSignUp) {
        if (!registerNickname.trim()) {
          setError('El nickname es requerido');
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nickname: registerNickname
            }
          }
        });
        if (error) throw error;
        setError('¡Registro exitoso! Por favor, inicia sesión.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
      setEmail('');
      setPassword('');
      setRegisterNickname('');
    } catch (error: any) {
      setError(error.message);
      console.error('Error in authentication:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || !nickname.trim()) return;

    try {
      const { error } = await supabase.from('comments').insert([{
        user_id: user.id,
        nickname,
        content: newComment,
        email: user.email
      }]);

      if (error) throw error;
      
      setNewComment('');
      setNickname('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-4">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600">Visitantes: {visitorCount}</span>
        </div>
        <div>
          {!user ? (
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 hover:text-blue-600 transition-colors text-sm"
            >
              {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {!user && (
        <form onSubmit={handleAuth} className="mb-6 space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                Nickname
              </label>
              <input
                id="nickname"
                type="text"
                value={registerNickname}
                onChange={(e) => setRegisterNickname(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {isSignUp ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </form>
      )}

      {user && (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="mb-4">
            <label htmlFor="comment-nickname" className="block text-sm font-medium text-gray-700 mb-1">
              Tu nickname
            </label>
            <input
              id="comment-nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Tu comentario
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all min-h-[100px]"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Enviar comentario
          </button>
        </form>
      )}

      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Comentarios</h2>
        </div>
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay comentarios aún. ¡Sé el primero en comentar!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{comment.nickname}</span>
                <span className="text-sm text-gray-500">
                  {format(new Date(comment.created_at), 'dd/MM/yyyy HH:mm')}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}