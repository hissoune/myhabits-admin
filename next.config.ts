import { hostname } from "os"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.pinimg.com","127.0.0.1"],
  },
  swcMinify: true
}

module.exports = nextConfig

