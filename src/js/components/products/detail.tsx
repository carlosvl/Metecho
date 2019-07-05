import BreadCrumb from '@salesforce/design-system-react/components/breadcrumb';
import PageHeader from '@salesforce/design-system-react/components/page-header';
import i18n from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { EmptyIllustration } from '@/components/404';

import { AppState } from '@/store';
import { Product } from '@/store/products/reducer';
import {
  selectProduct,
  selectProductSlug,
  selectProductNotFound,
} from '@/store/products/selectors';
import routes from '@/utils/routes';

type Props = {
  product?: Product | null;
  productSlug?: string;
  productNotFound: boolean;
} & RouteComponentProps;

const ProductDetail = ({ product, productSlug, productNotFound }: Props) => {
  const pageTitle = !productNotFound
    ? productSlug
    : `${i18n.t('Product Not Found')}`;

  return (
    <DocumentTitle title={`${pageTitle} | ${i18n.t('MetaShare')}`}>
      {product && productSlug && !productNotFound ? (
        <>
          <PageHeader
            className="page-header slds-p-around_x-large"
            title={product.name}
          />
          <div className="slds-p-around_x-large">
            <div className="slds-grid slds-gutters">
              <div className="slds-col slds-size_2-of-3 ">
                <BreadCrumb
                  assistiveText={{ label: 'Two item breadcrumb' }}
                  trail={[
                    <Link to={routes.home()} key="home">
                      {i18n.t('Home')}
                    </Link>,
                    <Link
                      className="slds-text-link_reset"
                      to={routes.product_detail(productSlug)}
                      key={productSlug}
                    >
                      {product.name}
                    </Link>,
                  ]}
                />
              </div>
              <div className="slds-col slds-size_1-of-3">
                <h2 className="slds-m-top_large slds-m-bottom_small slds-text-heading_small">
                  [{product.name}]
                </h2>
                {/* This description is pre-cleaned by the API */}
                {product.description && (
                  <p
                    className="markdown slds-p-bottom_small"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                )}
                <a href={product.repo_url}>{i18n.t('Link to Github Repo')}</a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <EmptyIllustration
            message={
              <Trans i18nKey="productCannotBeFound">
                That product cannot be found. Try the{' '}
                <Link to={routes.home()}>home page</Link>?
              </Trans>
            }
          />
        </>
      )}
    </DocumentTitle>
  );
};

const select = (appState: AppState, props: Props) => ({
  productSlug: selectProductSlug(appState, props),
  product: selectProduct(appState, props),
  productNotFound: selectProductNotFound(appState, props),
});
const WrappedProductDetail = connect(select)(ProductDetail);

export default WrappedProductDetail;
