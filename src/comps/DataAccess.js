
import { createBrowserClient } from '@supabase/ssr'


const supabaseUrl = 'https://rsgfsmrmgsffdxccbcmf.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZ2ZzbXJtZ3NmZmR4Y2NiY21mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzAyNTc5MSwiZXhwIjoyMDI4NjAxNzkxfQ.7tRc69hg8Is_Nf0tdVRPzsnJYxUyJzRtBQSAkbTEr-0'
const supabase = createBrowserClient(supabaseUrl, supabaseKey)


export async function getProductById(id) {
    let { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('productid', id)
        .single()

    if (error) {
        console.log(error)
        return {}
    }

    return product

}

export async function getCategories() {

    let { data: categories, error } = await supabase
        .from('categories')
        .select('*')

    if (error) {
        console.log(error)
        return []
    }

    return categories
}

export async function getProductsByCategory(categoryid) {


    let { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('categoryid', categoryid)

    if (error) {
        console.log(error)
        return []
    }

    return products
}

export async function getAllProducts() {

    let { data: products, error } = await supabase
        .from('products')
        .select('*')

    if (error) {
        console.log(error)
        return []
    }

    return products
}

export async function verifyUser(email, password) {

    let { data: user, error } = await supabase
        .from('Employees')
        .select('*')
        .eq('Email', email)
        .eq('Password', password)
        .single()

    if (error) {
        console.log(error)
        return {}
    }

    return user
}

export async function deleteProduct(id) {
    try {
        await supabase
            .from('products')
            .delete()
            .eq('productid', id)

        return true
    }
    catch (error) {
        console.error('Error deleting product:', error)
        return false
    }
}

export async function editProduct(id, updatedProduct) {
    try {
        await supabase
            .from('products')
            .update(updatedProduct)
            .eq('productid', id);

        return true;
    } catch (error) {
        console.error('Error updating product:', error);
        return false;
    }
}
