import { Link } from 'react-router-dom';
import styles from './NoFound.module.css';
import { useAppSelector } from '../redux/type';

export type EmptyType = 'products' | 'basket' | 'history' | 'chat' | '404' | 'search';

type props = {
  type?: EmptyType;
  title?: string;
  subtitle?: string;
  text?: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
};

export const NoFound = ({
  type = 'products',
  title,
  subtitle,
  text,
  actionLabel,
  actionTo,
  onAction,
}: props) => {
  const { user } = useAppSelector((s) => s.auth);
  const catalogLink = user?.uid ? `/products/${user.uid}` : '/add';
  const targetTo = actionTo === '/' ? catalogLink : (actionTo || catalogLink);

  const resolvedTitle =
    title ||
    (type === 'basket'
      ? 'Your Basket is Empty'
      : type === 'history'
      ? 'No Order History Yet'
      : type === 'chat'
      ? 'No Messages Found'
      : type === '404'
      ? 'Page Not Found'
      : text && text.toLowerCase().includes('no products')
      ? 'No Products Found'
      : text || 'No Items Available');

  const resolvedSubtitle =
    subtitle ||
    (type === 'basket'
      ? 'Explore our catalog and add your favorite items to the basket.'
      : type === 'history'
      ? 'Your completed purchases and order history will appear here.'
      : type === 'chat'
      ? 'Start a conversation with support for assistance.'
      : type === '404'
      ? 'The page you are looking for does not exist or has been moved.'
      : 'Try adjusting your search criteria or filter options.');

  const renderIcon = () => {
    switch (type) {
      case 'basket':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="19" cy="21" r="1.5" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        );
      case 'history':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'chat':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case '404':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  return (
    <div className={styles.emptyContainer}>
      <div className={styles.iconWrapper}>{renderIcon()}</div>
      <h2 className={styles.title}>{resolvedTitle}</h2>
      <p className={styles.subtitle}>{resolvedSubtitle}</p>

      {actionLabel && (targetTo || onAction) && (
        <div className={styles.actionGroup}>
          {targetTo ? (
            <Link to={targetTo} className={styles.actionBtn}>
              {actionLabel}
            </Link>
          ) : (
            <button type="button" onClick={onAction} className={styles.actionBtn}>
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
