import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/type';
import { Link } from 'react-router-dom';
import Setting from '../Setting/Setting';
import History from '../History/History';
import { getAllProducts } from '../../services/firebase/db/products';
import { deleteItemFromFav } from '../../redux/fav/fav';
import type { productI } from '../../../types/types';
import { HeartIcon, SettingsIcon, HistoryIcon, ShieldIcon, UserIcon, TrashIcon } from '../../utils/svgIcons';
import { convector } from '../../utils/convector';

export default function ProfilePage() {
  const { user, isAdmin, settings, rates } = useAppSelector((s) => s.auth);
  const { favorites } = useAppSelector((s) => s.fav);
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<'favorites' | 'settings' | 'history'>('favorites');
  const [favProducts, setFavProducts] = useState<productI[]>([]);
  const [loadingFavs, setLoadingFavs] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.uid) return;

    const userUid = user.uid;
    const fetchFavorites = async () => {
      setLoadingFavs(true);
      try {
        const res = await getAllProducts(userUid);
        if (res.ok && res.data) {
          const matched = res.data.filter((p) => favorites.includes(p.id));
          setFavProducts(matched);
        }
      } catch (err) {
        console.error('Error loading favorite products:', err);
      } finally {
        setLoadingFavs(false);
      }
    };

    fetchFavorites();
  }, [user?.uid, favorites]);

  const handleRemoveFav = (productId: string) => {
    if (!user?.uid) return;
    dispatch(deleteItemFromFav({ uid: user.uid, ownersUid: user.uid, productId }));
  };

  if (!user) {
    return (
      <div className={styles.profileWrapper}>
        <div className={styles.emptyState}>
          <h2>Пожалуйста, войдите в аккаунт для просмотра профиля</h2>
        </div>
      </div>
    );
  }

  const initialLetter = user.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <div className={styles.profileWrapper}>
      {/* User Hero Banner */}
      <div className={styles.userHeroCard}>
        <div className={styles.userAvatar}>{initialLetter}</div>
        <div className={styles.userInfo}>
          <div className={styles.userEmail}>{user.email}</div>
          <div className={styles.userBadges}>
            <span className={styles.roleBadge} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              {isAdmin ? (
                <>
                  <ShieldIcon size={16} color="#047857" /> Администратор
                </>
              ) : (
                <>
                  <UserIcon size={16} color="#047857" /> Покупатель
                </>
              )}
            </span>
            <span className={styles.uidBadge}>UID: {user?.uid ? user.uid.slice(0, 8) : ''}...</span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className={styles.tabsNav}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'favorites' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <HeartIcon size={18} color={activeTab === 'favorites' ? '#10b981' : '#64748b'} fill={activeTab === 'favorites' ? '#10b981' : 'none'} />
          <span>Избранное ({favorites.length})</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <SettingsIcon size={18} color={activeTab === 'settings' ? '#10b981' : '#64748b'} />
          <span>Настройки магазина</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'history' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <HistoryIcon size={18} color={activeTab === 'history' ? '#10b981' : '#64748b'} />
          <span>История заказов</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className={styles.tabContent}>
        {activeTab === 'favorites' && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              Избранные товары
            </h2>
            {loadingFavs ? (
              <div className={styles.emptyState}>Загрузка избранных товаров...</div>
            ) : favProducts.length === 0 ? (
              <div className={styles.emptyState}>
                <p>У вас пока нет избранных товаров.</p>
                <p style={{ marginTop: '0.5rem' }}>
                  Добавляйте понравившиеся товары из каталога!
                </p>
              </div>
            ) : (
              <div className={styles.favGrid}>
                {favProducts.map((product) => {
                  const convertedPrice = convector(
                    settings.currency || 'USD',
                    product.currency || 'USD',
                    product.price,
                    rates
                  );
                  return (
                    <div key={product.id} className={styles.favCard}>
                      <div className={styles.favImgWrapper}>
                        {product.img ? (
                          <img className={styles.favImg} src={product.img} alt={product.name} />
                        ) : (
                          <span className={styles.favImgPlaceholder}>📦</span>
                        )}
                      </div>
                      <div className={styles.favInfo}>
                        <div className={styles.favTitle}>{product.name}</div>
                        <div className={styles.favPrice}>
                          {convertedPrice} {settings.currency || 'USD'}
                        </div>
                      </div>
                      <div className={styles.favActions}>
                        <Link
                          to={`/products/${user?.uid}/product/${product.id}`}
                          className={styles.viewBtn}
                        >
                          Перейти к товару
                        </Link>
                        <button
                          className={styles.removeFavBtn}
                          onClick={() => handleRemoveFav(product.id)}
                          title="Удалить из избранного"
                        >
                          <TrashIcon size={16} color="#f43f5e" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && <Setting />}

        {activeTab === 'history' && <History />}
      </div>
    </div>
  );
}
