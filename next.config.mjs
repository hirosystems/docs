import { createMDX } from "fumadocs-mdx/next"
import path from 'path'

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
}

export default withMDX(config)