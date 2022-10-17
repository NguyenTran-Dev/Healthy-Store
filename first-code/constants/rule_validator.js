const rule_login = {
  email: 'required|email',
  password: 'required',
}
const rule_user = {
  full_name: 'required',
  email: 'required|email',
  password: 'required',
  is_admin: 'required',
}
const rule_user_update = {
  full_name: 'required',
  email: 'required|email',
  address: 'required'
}

const rule_change_password = {
  password: 'required',
  new_password: 'required',
}

const rule_order_details = {
  order_id: 'required',
  product_id: 'required',
  price: 'required',
  quantity: 'required',
}

const rule_order = {
  id_customer: 'required',
  amount: 'required',
  shipping_address: 'required',
  order_address: 'required',
  order_status: 'required',
}

const rule_product = {
  name_product: 'required',
  desc_product: 'required',
  price: 'required',
  img_url: 'required',
  rate: 'required',
  stock: 'required'
}

const rule_categories = {
  name: 'required',
  desc: 'required',
}

const rule_product_categories = {
  product_id: 'required',
  categories_id: 'required',
}

module.exports = {
  rule_login,
  rule_user,
  rule_change_password,
  rule_order_details,
  rule_order,
  rule_product,
  rule_categories,
  rule_user_update,
  rule_product_categories
}
